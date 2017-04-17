export class FriendSelectionController{
    constructor(DialogService){
        'ngInject';
        this.name="Toto";
        alert('Init');
        this.Dialog= DialogService;
    }
    save(){
        //Logic here
        alert('Save Button Pressed');
        this.Dialog.hide();
    }

    cancel(){
        alert('Cancel Button Pressed');
        this.Dialog.cancel();
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
