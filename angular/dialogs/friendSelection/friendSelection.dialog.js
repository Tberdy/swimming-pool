export class FriendSelectionController{
    constructor(DialogService,parent,name){
        'ngInject';
        this.Dialog= DialogService;
        this.parent=parent;
        this.name=name;
    }
    save(){
        //Logic here
        this.Dialog.hide("wesh");
    }

    cancel(){
        //alert('Cancel Button Pressed');
        this.Dialog.cancel("nope");
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
