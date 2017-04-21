export class ProfileEditController{
    constructor(DialogService,user, API){
        'ngInject';
        this.user=user;
        this.DialogService = DialogService;
        this.API = API;
        this.genders=["Homme","Femme"];
        
        this.dzOptions = {
            url: '/api/user/update/img',
            params: {
                id: user.id
            },
            maxFilesize: '10',
            addRemoveLinks: false,
            maxFiles: 1,
            acceptedFiles: 'image/*'
        };
    }

    save(){
        
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

