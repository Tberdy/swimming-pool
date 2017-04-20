export class CreateContentController{
    constructor(DialogService,user){
        'ngInject';
        this.user=user;
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

