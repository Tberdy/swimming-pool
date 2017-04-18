class ProfilePresController {
    constructor($stateParams, CurrentUserService, API) {
        'ngInject';

        this.id_user = $stateParams.id_user;
        this.user = CurrentUserService;
        this.API = API;

        this.profile = {};
        this.profileContents = [];
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
        });
    }

    getContent() {
        this.API.all('content/list').get('', {
            id: this.user.data.id,
            user_id: this.id_user
        }).then((response) => {
            this.profileContents = angular.copy(response.data.contents);
        });
    }
}

export const ProfilePresComponent = {
    templateUrl: './views/app/components/profile-pres/profile-pres.component.html',
    controller: ProfilePresController,
    controllerAs: 'vm',
    bindings: {}
}
