export class FriendSelectionController{
    constructor(DialogService){
        'ngInject';

        this.Dialog= DialogService;
    }

    save(){
        //Logic here
        this.Dialog.hide();
    }

    cancel(){
        this.Dialog.hide();
        this.Dialog.cancel();
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
