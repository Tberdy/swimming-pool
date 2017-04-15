class AppHeaderController {
    constructor($sce, API) {
        'ngInject';

        this.$sce = $sce;
        this.API = API;
        this.user = {};
    }

    getUser() {
        this.API.all('posts').get('')
                .then((response) => {
                    console.log(response);
                    this.posts = response.data;
                });
    }
}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'vm',
    bindings: {}
};
