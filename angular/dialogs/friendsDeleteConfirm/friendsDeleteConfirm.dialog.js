export class FriendsDeleteConfirmController{
    constructor(DialogService,FriendsQueryService,parent,selectedTab){
        'ngInject';

        this.DialogService = DialogService;
        this.FriendsQuery=FriendsQueryService;
        this.data=parent;
        this.selectedTab=selectedTab;
    }
    
    save(){
        //Delete is confirm
        //Take the list of selected friends
        /*
        for(var k in newTab)
        {
            this.FriendsQuery.deleteFriend(this.newTab[k].id ,this.data.user.data.id);
            
        }
        */
        this.DialogService.hide();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

