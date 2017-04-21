import {FriendSelectionController} from '../../../dialogs/friendSelection/friendSelection.dialog.js';
import {FriendsDeleteConfirmController} from '../../../dialogs/friendsDeleteConfirm/friendsDeleteConfirm.dialog.js';

class FriendsListController {
    constructor(DialogService, API, CurrentUserService,FriendsQueryService,ToastService,$state) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.CurrentUser = CurrentUserService;
        this.FriendsQuery= FriendsQueryService;
        this.$state=$state;
        this.message="";
        this.emptyQuery=true;
        this.user=null;
        this.toast=ToastService;
        this.currentFriends=null;
        this.noFriends=true;
    }
    
    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getFriendsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.currentFriends = angular.copy(response.data.friends);
            });
        });
        this.toast.displayToasts();
    }
    goToProfil(friend)
    {
        this.$state.go('app.profile', {id_user: friend.id});
    }
    checkNoFriends()
    {
        if(this.currentFriends===null) return true;
        if(this.currentFriends.length <= 0)return true;
        return false;
    }
    display(user)
    {
        return user.firstname+ " " + user.name;
    }
    querySearch(query) {
        if (query !== "")
        {
            this.emptyQuery=false;
            var results = [];
            var re = query + "+";
            var regex = new RegExp(re, "i");
            for (var k in this.currentFriends) {
                if (regex.test(this.display(this.currentFriends[k])))
                {
                    results.push(this.currentFriends[k]);
                }
            }
            return results;
        }
        this.emptyQuery=true;
        return this.currentFriends;

    }
    deleteSelection()
    {
        //Load the selected friends
        var newTab = [];
        this.message="";
        for(var k in this.currentFriends)
        {
            if(this.currentFriends[k].selected)
            {
                newTab.push(this.currentFriends[k]);
                
            }
        }
        if(newTab.length == 0)
        {
            this.message="Vous n'avez sélectionné personne !";
            return;
        }
        let options = {
            controller: FriendsDeleteConfirmController,
            controllerAs: 'vm',
            locals:
                    {
                        parent: this,
                        selectedTab: newTab
                    }
        }
        
        this.Dialog.fromTemplate('friendsDeleteConfirm', options);
        //return this.Dialog.fromTemplate('confirmDelete');
    }
    friendsSelection()
    {
        let options = {
            controller: FriendSelectionController,
            controllerAs: 'vm',
            locals:
                    {
                        parent: this
                    }
        }
        this.Dialog.fromTemplate('friendSelection', options);
        //alert(a);
    }
}

export const FriendsListComponent = {
    templateUrl: './views/app/components/friends-list/friends-list.component.html',
    controller: FriendsListController,
    controllerAs: 'vm',
    bindings: {}
}
