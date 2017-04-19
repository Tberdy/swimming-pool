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
        this.postData = [
            {
                user: null,
                data: null
            }
        ];
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
                for (var k = 0; k < this.currentFriends.length; k++)
                {
                    let promise = this.ContentQuery.getPostsPromise(this.currentFriends[k].id);
                    promise.then((response) => {
                        if (angular.copy(response.data.posts) !== null)
                        {
                            this.postData.push({
                                user: this.currentFriends[k],
                                data: angular.copy(response.data.posts)
                            });
                        }

                    });
                    let promisePic = this.ContentQuery.getPicturesPromise(this.currentFriends[k].id);
                    promisePic.then((response) => {
                        if (angular.copy(response.data.pictures) !== null)
                        {
                            this.postData.push({
                                user: this.currentFriends[k],
                                data: angular.copy(response.data.pictures)
                            });
                        }

                    });

                }
                this.sortPosts();
                console.log(this.postData);
            });
        });
    }
    sortPosts()
    {
        
        this.postData.sort(function (a, b) {
            return Date.parse(a.data.date)-Date.parse(b.data.date);
        });
    }
    delay(post)
    {
        if(post===null) return 0;
        var diff = Date.now()-Date.parse(post.data.date);
        var date = new Date(diff);
        return date.toString();
    }
    isPicture(post)
    {
        if(post.type=="picture") return true;
        return false;
    }
    isText(post)
    {
        if(post.type=="post") return true;
        return false;
    }
    test()
    {
        console.log(this.postData);
    }

}

export const PostDisplayComponent = {
    templateUrl: './views/app/components/post-display/post-display.component.html',
    controller: PostDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
