export class CreateFileController{
    constructor(DialogService,user){
        'ngInject';
        this.user=user;
        
        this.DialogService = DialogService;
        
        this.dzOptions = {
            url: '/api/content/add/file',
            params: {
                id: user.id
            },
            maxFilesize: '10',
            addRemoveLinks: false,
            maxFiles: 1,
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

