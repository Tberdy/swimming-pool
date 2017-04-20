import {CommentsDisplayController} from '../../../dialogs/commentsDisplay/commentsDisplay.dialog.js';

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
        //var cpts = 0;
        this.data=[];
        this.content = [];
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

                        //this.cpts++;
                        if (angular.copy(response.data.posts) !== null)
                        {
                            this.content.push(angular.copy(response.data.posts));
                            this.associate();
                            this.sortPosts();

                        }

                    });
                    let promisePic = this.ContentQuery.getPicturesPromise(this.currentFriends[k].id);
                    promisePic.then((response) => {
                        //this.cpts++;
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
    commentsDialog(post)
    {
        let options = {
            controller: CommentsDisplayController,
            controllerAs: 'vm',
            locals:
                    {
                        contentId: post.content.id
                    }
        }
        
        this.Dialog.fromTemplate('commentsDisplay', options);
    }
    sortPosts()
    {
        this.data.sort(function (a, b) {
            return Date.parse(b.content.date) - Date.parse(a.content.date);
        });
    }
    delay(post)
    {
        if (post === null || typeof post === 'undefined')
            return 0;
        var diff = Date.now() - Date.parse(post.content.date);
        
        var sec=parseInt(diff/1000);
        var min=parseInt(sec/60);
        var hour=parseInt(min/60);
        var day=parseInt(hour/24);
        var week=parseInt(day/7);
        var month=parseInt(day/31);
        var year=parseInt(month/12);
        if(year>1) return "Il y a " + year + " ans.";
        if(year==1) return "Il y a " + year + " an.";
        if(month>=2) return "Il y a " + month + " mois.";
        if(week>1) return "Il y a " + week + " semaines.";
        if(week==1) return "Il y a " + week + " semaine.";
        if(day>1) return "Il y a " + day + " jours.";
        if(day==1) return "Il y a " + day + " jour.";
        if(hour>1) return "Il y a " + hour + " heures.";
        if(hour==1) return "Il y a " + hour + " heure.";
        if(min>1) return "Il y a " + min + " minutes.";
        if(min==1) return "Il y a " + min + " minute.";
        if(sec>20) return "Il y a " + sec + " secondes.";
        return "À l'instant.";
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
    test()
    {
        console.log(this.data);
    }

}

export const PostDisplayComponent = {
    templateUrl: './views/app/components/post-display/post-display.component.html',
    controller: PostDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
