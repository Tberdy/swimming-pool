class AppHeaderController {
    constructor($sce, API) {
        'ngInject';

        this.$sce = $sce;
        this.API = API;
        this.user = {};
        this.getUser();
    }

    getUser() {
        this.API.all('user').get('')
                .then((response) => {
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
