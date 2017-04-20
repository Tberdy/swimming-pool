class AppHeaderController {
    constructor($sce, API, $auth, CurrentUserService, $state, $localStorage) {
        'ngInject';

        this.$sce = $sce;
        this.API = API;
        this.$auth = $auth;
        this.user = CurrentUserService;
        this.$state = $state;
        this.$localStorage = $localStorage;
    }
    
    logout() {
        this.$auth.logout();
        this.$state.go('app.login');
    }
}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'vm',
    bindings: {}
};
