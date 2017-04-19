class FriendsRequestController{
    constructor(DialogService,CurrentUserService,FriendsQueryService) {
        'ngInject';
        this.Dialog = DialogService;
        this.CurrentUser = CurrentUserService;
        this.FriendsQuery= FriendsQueryService;
        this.user=null;
        this.friendsRequest=null;
    }

    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getRequestsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.friendsRequest = angular.copy(response.data.fRequests);
            });
        });
    }
}

export const FriendsRequestComponent = {
    templateUrl: './views/app/components/friends-request/friends-request.component.html',
    controller: FriendsRequestController,
    controllerAs: 'vm',
    bindings: {}
}
