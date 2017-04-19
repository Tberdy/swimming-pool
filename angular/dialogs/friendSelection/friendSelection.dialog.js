export class FriendSelectionController {
    constructor(DialogService, API, FriendsQueryService, CurrentUserService, parent,$state) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.API = API;
        this.parent = parent;
        this.CurrentUser = CurrentUserService;
        this.users = null;
        this.user = null;
        this.friendsInvitation = null;
        this.friends = null;
        this.parent = parent;
        this.message = "";
        this.isDisabled = false;
        this.$state=$state;
        this.$onInit();
    }
    $onInit() {
        let promiseUsers = this.CurrentUser.getAllUsersPromise();
        promiseUsers.then((response) => {
            this.users = angular.copy(response.data.users);
        });
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseInvitation = this.FriendsQuery.getRequestsPromise(this.user.id);
            promiseInvitation.then((response) => {
                this.friendsInvitation = angular.copy(response.data.fRequests);

            });
            let promiseFriends = this.FriendsQuery.getFriendsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.friends = angular.copy(response.data.friens);
            });
        });
    }
    save() {
        this.message = "";
        //Valid select item
        if (this.selectedItem === null)
        {
            this.message = "L\'utilisateur n\'éxiste pas";
            return;
        }
        //Already friend or invitation sent

        for (var i in this.friends)
        {
            if (this.friends[i].id === this.selectedItem.id)
            {
                this.message = "Vous êtes déjà ami(e) avec cette personne !";
                return;
            }
        }
        for (var j in this.friendsInvitation)
        {
            if (this.friendsInvitation[j].id === this.selectedItem.id)
            {
                this.message = "Vous avez déjà envoyé une requête !";
                return;
            }
        }
        let promiseAdd = this.FriendsQuery.addFriendsPromise(this.user.id, this.selectedItem.id)
        promiseAdd.then((response) => {
            this.FriendsQuery.addToast("Invitation envoyée !");
            console.log("wesh");
            this.$state.go('app.friends');
            this.Dialog.hide();
        });
        
        
    }

    cancel() {
        this.Dialog.cancel();
    }
    //Load of all the users
    loadAll() {
        this.users = this.currentUser.allUsers;
    }
    display(user)
    {
        return user.firstname + " " + user.name;
    }
    querySearch(query) {
        console.log(this.users);
        if (query != "")
        {
            var results = [];
            var re = query + "+";
            var regex = new RegExp(re, "i");
            for (var k in this.users) {


                if (regex.test(this.display(this.users[k])))
                {
                    results.push(this.users[k]);
                }
            }
            return results;
        }
        return "";

    }

}
export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
