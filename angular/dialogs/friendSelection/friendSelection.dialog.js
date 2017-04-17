export class FriendSelectionController{
    constructor(DialogService){
        'ngInject';
        this.name="Toto";
        this.Dialog= DialogService;
    }
    save(){
        //Logic here
        this.Dialog.hide();
    }

    cancel(){
        //alert('Cancel Button Pressed');
        this.Dialog.cancel();
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
