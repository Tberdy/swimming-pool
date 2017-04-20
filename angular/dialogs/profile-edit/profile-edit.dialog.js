export class ProfileEditController{
    constructor(DialogService,user){
        'ngInject';
        this.user=user;
        this.DialogService = DialogService;
        this.genders=["Homme","Femme"];
    }

    save(){
        //Logic here
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

