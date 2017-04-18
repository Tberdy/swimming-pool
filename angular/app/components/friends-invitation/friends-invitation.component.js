class FriendsInvitationController {
    constructor(DialogService, FriendsQueryService, CurrentUserService) {
        'ngInject';
        this.Dialog = DialogService;
        this.FriendsQuery = FriendsQueryService;
        this.CurrentUser = CurrentUserService;
        this.user = null;
        //this.friends = null;
        this.friendsList = null;
    }

    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getFriendsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.friendsList = angular.copy(response.data.friends);
            });
        });
        /*
         this.people = [
         {name: 'Taha Miyara', img: 'img/example/taha.jpg', selected: false},
         {name: 'Thomas Berdy', img: 'img/example/thomas.jpg', selected: false},
         {name: 'Mark Zuckerberg', img: 'img/example/mark.jpg', selected: false}
         ];
         */
    }
    /*
    invitationFilter(friends)
    {
        this.friendsInvitation = null;
        for (var k in friends)
        {
            if (friends[k].pivot.id_from != this.user.id)
            {
                this.friendsInvitation.push(friends[k]);
            }
        }
        
        this.friendsInvitation=friends;
        console.log("c1: "+ this.friendsInvitation);
        return;
    }
    */
}

export const FriendsInvitationComponent = {
    templateUrl: './views/app/components/friends-invitation/friends-invitation.component.html',
    controller: FriendsInvitationController,
    controllerAs: 'vm',
    bindings: {}
}
