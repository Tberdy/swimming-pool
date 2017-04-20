class EventDisplayController{
    constructor(DialogService, API, CurrentUserService, FriendsQueryService, ContentQueryService) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.CurrentUser = CurrentUserService;
        this.FriendsQuery = FriendsQueryService;
        this.ContentQuery = ContentQueryService;
        this.user = null;
        this.currentFriends = null;
        this.done = false;
        this.friendsLoaded = false;
        this.content=[];
        this.data=[];
    }

    $onInit()
    {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getFriendsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.currentFriends = angular.copy(response.data.friends);
                for (var k = 0; k < this.currentFriends.length; k++)
                {
                    let promise = this.ContentQuery.getEventsPromise(this.currentFriends[k].id);
                    promise.then((response) => {

                        if (angular.copy(response.data.posts) !== null)
                        {
                            this.content.push(angular.copy(response.data.posts));
                            this.associate();
                            this.sortPosts();

                        }

                    });
                }

            });
        });
    }
    associate()
    {
        if (this.content !== null && this.content.length > 0)
        {
            var currentContent = this.content.pop();
            for (var i in currentContent)
            {
                for (var j in this.currentFriends)
                {
                    if (this.currentFriends[j].id === currentContent[i].user_id)
                    {
                        this.data.push({
                            user: this.currentFriends[j],
                            content: currentContent[i]
                        });
                    }r
                }
            }

        }
    }
    sortPosts()
    {
        this.data.sort(function (a, b) {
            return Date.parse(b.content.date) - Date.parse(a.content.date);
        });
    }
    test()
    {
        console.log(this.data);
    }
}

export const EventDisplayComponent = {
    templateUrl: './views/app/components/event-display/event-display.component.html',
    controller: EventDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
