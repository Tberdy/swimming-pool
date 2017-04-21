class FriendsInvitationController {
    constructor(DialogService, FriendsQueryService, CurrentUserService,$state) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.CurrentUser = CurrentUserService;
        this.user = null;
        this.$state=$state;
        //this.friends = null;
        this.friendsInvitation = null;
    }

    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getInvitationsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.friendsInvitation = angular.copy(response.data.fInvitations);
            });
        });

    }
    addFriend(friendId)
    {
        let promise = this.FriendsQuery.addFriendsPromise(this.user.id, friendId)
        promise.then((response) => {
            //refresh
            this.FriendsQuery.addToast("Invitation acceptée !");
            this.$state.reload();
        });
    }
    refuseFriend(friendId)
    {
        let promise = this.FriendsQuery.refuseFriendsPromise(this.user.id, friendId)
        promise.then((response) => {
            this.FriendsQuery.addToast("Invitation refusée.");
            this.$state.reload();
        });
    }
}

export const FriendsInvitationComponent = {
    templateUrl: './views/app/components/friends-invitation/friends-invitation.component.html',
    controller: FriendsInvitationController,
    controllerAs: 'vm',
    bindings: {}
}
