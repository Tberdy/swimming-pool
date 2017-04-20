export class ProfileEditController{
    constructor(DialogService,user, API){
        'ngInject';
        this.user=user;
        this.DialogService = DialogService;
        this.genders=["Homme","Femme"];
        
        this.dzOptions = {
            url: '/api/content/add/file',
            params: {
                id: null
            },
            maxFilesize: '10',
            addRemoveLinks: false,
            maxFiles: 1
        };
    }

    save(){
        //Logic here
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

