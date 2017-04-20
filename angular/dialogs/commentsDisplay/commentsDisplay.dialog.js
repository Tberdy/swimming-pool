export class CommentsDisplayController{
    constructor(DialogService,contentId){
        'ngInject';
        this.contentId=contentId;
        this.DialogService = DialogService;
        this.newComment="";
    }
    isEmpty()
    {
        if(this.newComment===null || this.newComment==="") return "empty";
        return "unempty";
    }
    save(){
        //Logic here
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

