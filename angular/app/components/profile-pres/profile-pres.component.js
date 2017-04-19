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
        
        this.dzOptions = {
		url : '/api/content/add/file',
                params : {
                    id: null
                },
		maxFilesize : '10',
		addRemoveLinks : false,
                maxFiles: 1
	};
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
        this.API.all('user/get').get('', {
            user_id: this.id_user
        }).then((response) => {
            this.profile = angular.copy(response.data.user);
            this.profile.ppLink = this.profile.ppLink || 'img/default-user.png';
            
            this.dzOptions.params.id = this.user.data.id;
            
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
        this.createComment = false;

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
                case 'comment':
                    this.createComment = true;
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
