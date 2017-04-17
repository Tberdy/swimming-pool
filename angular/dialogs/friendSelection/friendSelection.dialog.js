export class FriendSelectionController {
    constructor(DialogService, API, FriendsQueryService, parent, $timeout, $q, $log) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.API = API;
        this.parent = parent;
        this.name = name;
        this.users = this.loadAll();
        this.parent = parent;
        this.message = "";
        this.timeout = $timeout;
        this.q = $q;
        this.log = $log;
        this.isDisabled = false;

    }
    save() {
        
        //Valid select item
        if(this.selectedItem===null)
        {
           this.message = "undefined";
           return; 
        }
        alert(this.selectedItem.name);
        //Already friend or invitation sent
        var friendsList = this.FriendsQuery.getFriends(this.currentUser.data.id);
        for (var i in friendsList)
        {
            if (friendsList[i].id === this.selectedItem.id)
            {
                this.message = "already";
                return;
            }
        }

        this.FriendsQuery.addFriend(this.selectedItem.id);
        this.Dialog.hide();
    }

    cancel() {
        //alert('Cancel Button Pressed');
        this.Dialog.cancel();
    }
    //Load of all the users
    loadAll() {
        alert(this.display(this.FriendsQuery.allUsers[0]));
        this.users=this.FriendsQuery.allUsers;
    }
    display(user)
    {
        return user.firstname + " " + user.name;
    }
    querySearch(query) {

        var results = [];
        var re = query + "+";
        var regex = new RegExp(re, "i");
        for (var k in this.users) {
            
            if (regex.test(this.display(this.user[k])))
            {
                results.push(this.user[k]);
            }
        }
        return results;
    }

   
}
export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
