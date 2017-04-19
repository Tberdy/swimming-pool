export class FriendsDeleteConfirmController {
    constructor(DialogService, FriendsQueryService, CurrentUserService, parent, selectedTab,$state) {
        'ngInject';

        this.DialogService = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.CurrentUser = CurrentUserService;
        this.data = parent;
        this.selectedTab = selectedTab;
        this.user = null;
        this.$state=$state;
        this.$onInit();
    }
    $onInit()
    {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
        });
    }
    save() {
        //Delete is confirmed
        //Take the list of selected friends
        for (var k in this.selectedTab)
        {

           this.FriendsQuery.deleteFriend(this.selectedTab[k].id, this.user.id);

        }
        this.FriendsQuery.addToast("Vous avez supprimé " + this.selectedTab.length + " ami(s).");
        this.$state.reload();
        this.DialogService.hide();
        
    }

    cancel() {
        this.DialogService.cancel();
    }
}

