class ProfilePresController {
    constructor($stateParams, CurrentUserService, API) {
        'ngInject';

        this.id_user = $stateParams.id_user;
        this.user = CurrentUserService;
        this.API = API;

        this.profile = {};
        this.profileContents = [];
        this.profileComments = {};

        this.ownProfile = false;
        this.createPost = false;
        this.createEvent = false;
        this.createFile = false;

    }

    $onInit() {
        let promise = this.user.getUserPromise();
        promise.then((response) => {
            this.user.data = angular.copy(response);
            this.getContent();
        });

        this.getProfile();
    }

    getProfile() {
        console.log();
        this.API.all('user/get').get('', {
            user_id: this.id_user
        }).then((response) => {
            this.profile = angular.copy(response.data.user);
            this.profile.ppLink = this.profile.ppLink || 'img/default-user.png';

            this.checkOwnProfile();
        });
    }

    getContent() {
        this.API.all('content/list').get('', {
            id: this.user.data.id,
            user_id: this.id_user
        }).then((response) => {
            this.profileContents = angular.copy(response.data.contents);
            angular.forEach(this.profileContents, function(value, key) {
                this.getCommentsFor(value.id);
            }.bind(this));
        });
    }
    
    getCommentsFor(content_id) {
        this.API.all('comments/list').get('', {
            id: this.user.data.id,
            content_id: content_id
        }).then((response) => {
            this.profileComments[content_id] = angular.copy(response.data.comments);
        });
    } 

    checkOwnProfile() {
        if (this.user.data.id == this.id_user) {
            this.ownProfile = true;
        }
    }

    toogleCreate(target, state) {
        this.createPost = false;
        this.createEvent = false;
        this.createFile = false;

        if (state) {
            switch (target) {
                case 'post':
                    this.createPost = true;
                    break;
                case 'event':
                    this.createEvent = true;
                    break;
                case 'file':
                    this.createFile = true;
                    break;
            }
        }

    }
}

export const ProfilePresComponent = {
    templateUrl: './views/app/components/profile-pres/profile-pres.component.html',
    controller: ProfilePresController,
    controllerAs: 'vm',
    bindings: {}
}
