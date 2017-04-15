class AppHeaderController {
    constructor($sce, API, $auth) {
        'ngInject';

        this.$sce = $sce;
        this.API = API;
        this.$auth = $auth;
        
        
    }
    
    $onInit(){
        this.user = {};
        if(this.isAuth()) this.getUser();
    }

    isAuth() {
        return this.$auth.isAuthenticated();
    }

    getUser() {
        this.API.all('user').get('')
                .then((response) => {
                    this.user = angular.copy(response);
                    console.log(response);
                });
    }
}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'vm',
    bindings: {}
};
