export class CommentsDisplayController{
    constructor(DialogService,contentId){
        'ngInject';
        this.contentId=contentId;
        this.DialogService = DialogService;
    }

    save(){
        //Logic here
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

