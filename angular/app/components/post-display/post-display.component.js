class PostDisplayController {
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
        //var cpts = 0;
        this.data=[];
        /*
        this.data = [
            {
                user: null,
                content: null
            }
        ];
        */
        this.content = [];
        //this.postData = null;
    }
    $onInit()
    {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            let promiseFriends = this.FriendsQuery.getFriendsPromise(this.user.id);
            promiseFriends.then((response) => {
                this.currentFriends = angular.copy(response.data.friends);
                this.friendsLoaded = true;
                for (var k = 0; k < this.currentFriends.length; k++)
                {
                    let promise = this.ContentQuery.getPostsPromise(this.currentFriends[k].id);
                    promise.then((response) => {

                        this.cpts++;
                        if (angular.copy(response.data.posts) !== null)
                        {
                            this.content.push(angular.copy(response.data.posts));
                            this.associate();
                            this.sortPosts();

                        }

                    });
                    let promisePic = this.ContentQuery.getPicturesPromise(this.currentFriends[k].id);
                    promisePic.then((response) => {
                        this.cpts++;
                        if (angular.copy(response.data.pictures) !== null)
                        {
                            this.content.push(angular.copy(response.data.pictures));
                            this.associate();
                            this.sortPosts();
                        }
                    });
                }

            });
        });
    }
    /*
     isDone()
     {
     if(this.done===true)return true;
     if(this.friendsLoaded && this.currentFriends.length == 2*this.cpts)
     {
     this.done=true;
     }
     return this.done;
     }
     */
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
                    }
                }
            }

        }
    }
    sortPosts()
    {
        this.data.sort(function (a, b) {
            return Date.parse(a.content.date) - Date.parse(b.content.date);
        });
    }
    delay(post)
    {
        if (post === null || typeof post === 'undefined')
            return 0;
        var diff = Date.now() - Date.parse(post.content.date);
        var date = new Date(diff);
        return date.toString();
    }
    isPicture(post)
    {
        if (post.content.type === "picture")
            return true;
        return false;
    }
    isText(post)
    {
        if (post.content.type === "post")
            return true;
        return false;
    }

}

export const PostDisplayComponent = {
    templateUrl: './views/app/components/post-display/post-display.component.html',
    controller: PostDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
