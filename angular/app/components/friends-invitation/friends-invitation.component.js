class FriendsInvitationController {
    constructor(DialogService, FriendsQueryService, CurrentUserService) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.CurrentUser = CurrentUserService;
        this.user = null;
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
                console.log(this.friendsInvitation);
            });
        });

    }
    addFriend(friendId)
    {
        let promise = this.FriendsQuery.addFriendsPromise(this.user.id, friendId)
        promise.then((response) => {
            //refresh
            console.log("Friend added");
        });
    }
}

export const FriendsInvitationComponent = {
    templateUrl: './views/app/components/friends-invitation/friends-invitation.component.html',
    controller: FriendsInvitationController,
    controllerAs: 'vm',
    bindings: {}
}
