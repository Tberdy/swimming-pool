class PictureDisplayController{
    constructor(CurrentUserService,ContentQueryService){
        'ngInject';
        this.CurrentUser=CurrentUserService;
        this.ContentQuery=ContentQueryService;
        //
    }

    $onInit(){
    }
}

export const PictureDisplayComponent = {
    templateUrl: './views/app/components/picture-display/picture-display.component.html',
    controller: PictureDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
