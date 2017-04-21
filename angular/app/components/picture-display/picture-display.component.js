class PictureDisplayController{
    constructor(CurrentUserService,ContentQueryService,API){
        'ngInject';
        this.CurrentUser=CurrentUserService;
        this.ContentQuery=ContentQueryService;
        this.API=API;
        this.user=[];
        this.data=[];
    }

    $onInit(){
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            this.API.all('content/list/pictures').get('', {
                user_id: this.user.id
            }).then((response) => {
                this.data = angular.copy(response.data.pictures);
                
                
            });
        });
    }
}

export const PictureDisplayComponent = {
    templateUrl: './views/app/components/picture-display/picture-display.component.html',
    controller: PictureDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
