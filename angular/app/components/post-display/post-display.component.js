import {CommentsDisplayController} from '../../../dialogs/commentsDisplay/commentsDisplay.dialog.js';

class PostDisplayController {
    constructor(DialogService, API, CurrentUserService, FriendsQueryService, ContentQueryService, ToastService) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.CurrentUser = CurrentUserService;
        this.FriendsQuery = FriendsQueryService;
        this.ContentQuery = ContentQueryService;
        this.user = null;
        this.currentFriends = null;
        this.done = false;
        this.toast = ToastService;
        this.comments = [];
        //var cpts = 0;
        this.data = [];
        this.content = [];
    }
    $onInit()
    {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            this.API.all('content/friends/list').get('', {
                id: this.user.id
            }).then((response) => {
                this.data = angular.copy(response.data.contents);
                angular.forEach(this.data, function (value, key) {
                    this.countComments(value.id, key);
                }.bind(this));
                this.sortPosts();
            });
        });

    }
    displayNumberComments(post)
    {
        if (post.numberComments == 0)
            return "Aucun commentaire - Ajouter un commentaire.";
        if (post.numberComments == 1)
            return "1 commentaire - Voir les commentaires.";
        if (post.numberComments > 1)
            return  post.numberComments + " commentaires - Voir les commentaires.";
        return "Error in numberComments";
    }
    countComments(content_id, key) {
        this.API.all('comments/count').get('', {
            id: this.user.id,
            content_id: content_id
        }).then((response) => {
            this.data[key].count = angular.copy(response.data.count);
        });
    }
    commentsDialog(post)
    {
        let options = {
            controller: CommentsDisplayController,
            controllerAs: 'vm',
            locals:
                    {
                        contentId: post.id,
                        user: this.user
                    }
        }

        this.Dialog.fromTemplate('commentsDisplay', options);
    }
    sortPosts()
    {
        this.data.sort(function (a, b) {
            return Date.parse(b.updated_at) - Date.parse(a.updated_at);
        });
    }
    delay(post)
    {
        if (post === null || typeof post === 'undefined')
            return 0;
        var diff = Date.now() - Date.parse(post.updated_at);

        var sec = parseInt(diff / 1000);
        var min = parseInt(sec / 60);
        var hour = parseInt(min / 60);
        var day = parseInt(hour / 24);
        var week = parseInt(day / 7);
        var month = parseInt(day / 31);
        var year = parseInt(month / 12);
        if (year > 1)
            return "Il y a " + year + " ans.";
        if (year == 1)
            return "Il y a " + year + " an.";
        if (month >= 2)
            return "Il y a " + month + " mois.";
        if (week > 1)
            return "Il y a " + week + " semaines.";
        if (week == 1)
            return "Il y a " + week + " semaine.";
        if (day > 1)
            return "Il y a " + day + " jours.";
        if (day == 1)
            return "Il y a " + day + " jour.";
        if (hour > 1)
            return "Il y a " + hour + " heures.";
        if (hour == 1)
            return "Il y a " + hour + " heure.";
        if (min > 1)
            return "Il y a " + min + " minutes.";
        if (min == 1)
            return "Il y a " + min + " minute.";
        if (sec > 20)
            return "Il y a " + sec + " secondes.";
        return "À l'instant.";
    }
    isPicture(post)
    {
        if (post.type === "picture")
            return true;
        return false;
    }
    isText(post)
    {
        if (post.type === "post")
            return true;
        return false;
    }
    test()
    {
        console.log("Data");
        console.log(this.data);
        console.log("Content");
        console.log(this.content);
        console.log("Number");
        console.log(this.numberComments);
    }
    react(type, key, post) {
        this.API.all('reactions/add').post('', {
            id: this.user.id,
            content_id: post.id,
            type: type
        }).then((response) => {
            this.data[key].style = {};
            this.data[key].style[type] = 'md-primary';
            this.changeUserReaction(type, key);
        });
    }
    
    changeUserReaction(type, key) {
        if (this.data[key].userReaction['like']) {
            this.data[key].userReaction['like'] = false;
            this.data[key].reactions['like']--;
        } 
        if (this.data[key].userReaction['love']) {
            this.data[key].userReaction['love'] = false;
            this.data[key].reactions['love']--;
        }
        if (this.data[key].userReaction['dislike']) {
            this.data[key].userReaction['dislike'] = false;
            this.data[key].reactions['dislike']--;
        }
        if (this.data[key].userReaction['happy']) {
            this.data[key].userReaction['happy'] = false;
            this.data[key].reactions['happy']--;
        }
        if (this.data[key].userReaction['neutral']) {
            this.data[key].userReaction['neutral'] = false;
            this.data[key].reactions['neutral']--;
        }
        if (this.data[key].userReaction['fire']) {
            this.data[key].userReaction['fire'] = false;
            this.data[key].reactions['fire']--;
        }
        this.data[key].userReaction[type] = true;
        this.data[key].reactions[type]++; 
        
    }
}

export const PostDisplayComponent = {
    templateUrl: './views/app/components/post-display/post-display.component.html',
    controller: PostDisplayController,
    controllerAs: 'vm',
    bindings: {}
}
