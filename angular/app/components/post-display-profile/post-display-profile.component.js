import {CommentsDisplayController} from '../../../dialogs/commentsDisplay/commentsDisplay.dialog.js';
import {ProfileEditController} from '../../../dialogs/profile-edit/profile-edit.dialog.js';
import {CreateEventController} from '../../../dialogs/create-event/create-event.dialog.js';
import {CreatePostController} from '../../../dialogs/create-post/create-post.dialog.js';

class PostDisplayProfileController {
    constructor($stateParams, DialogService, API, CurrentUserService, ToastService) {
        'ngInject';

        this.id_user = $stateParams.id_user;
        this.Dialog = DialogService;
        this.API = API;
        this.CurrentUser = CurrentUserService;
        this.user = null;
        this.toast = ToastService;
        this.data = [];
        this.nbComment = {};

        this.ownProfile = false;
        this.createPost = false;
        this.createEvent = false;
        this.createFile = false;

        this.dzOptions = {
            url: '/api/content/add/file',
            params: {
                id: null
            },
            maxFilesize: '10',
            addRemoveLinks: false,
            maxFiles: 1
        };
    }
    $onInit() {
        let promiseUser = this.CurrentUser.getUserPromise();
        promiseUser.then((response) => {
            this.user = angular.copy(response);
            this.checkOwnProfile();
            this.getContent();
        });
        this.toast.displayToasts();

    }
    editProfilDialog() {
        let options = {
            controller: ProfileEditController,
            controllerAs: 'vm',
            locals:
                    {
                        user: this.user
                    }
        }

        this.Dialog.fromTemplate('profile-edit', options);
    }
    createPostDialog()
    {
        let options = {
            controller: CreatePostController,
            controllerAs: 'vm',
            locals:
                    {
                        user: this.user
                    }
        }

        this.Dialog.fromTemplate('create-post', options);
    }
    createEventDialog()
    {
        let options = {
            controller: CreateEventController,
            controllerAs: 'vm',
            locals:
                    {
                        user: this.user
                    }
        }

        this.Dialog.fromTemplate('create-event', options);
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
    sortPosts() {
        this.data.sort(function (a, b) {
            return Date.parse(b.created_at) - Date.parse(a.created_at);
        });
    }

    delay(post) {
        if (post === null || typeof post === 'undefined')
            return 0;
        var diff = Date.now() - Date.parse(post.created_at);

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

    isPicture(post) {
        if (post.type === "picture")
            return true;
        return false;
    }

    isText(post) {
        if (post.type === "post")
            return true;
        return false;
    }

    getContent() {
        this.API.all('content/list').get('', {
            id: this.user.id,
            user_id: this.id_user
        }).then((response) => {
            this.data = angular.copy(response.data.contents);
            this.sortPosts();
            angular.forEach(this.data, function (value, key) {
                this.countComments(value.id, key);
            }.bind(this));
            
        });
    }  

    countComments(content_id, key) {
        this.API.all('comments/count').get('', {
            id: this.user.id,
            content_id: content_id
        }).then((response) => {
            this.data[key].count = angular.copy(response.data.count);
        });
    }

    checkOwnProfile() {
        if (this.user.id == this.id_user) {
            this.ownProfile = true;
        }
    }

    toogleCreate(target) {
        switch (target) {
            case 'post':
                this.createPost = !this.createPost;
                this.createEvent = false;
                this.createFile = false;
                break;
            case 'event':
                this.createPost = false;
                this.createEvent = !this.createEvent;
                this.createFile = false;
                break;
            case 'file':
                this.createPost = false;
                this.createEvent = false;
                this.createFile = !this.createFile;
                break;
        }
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

export const PostDisplayProfileComponent = {
    templateUrl: './views/app/components/post-display-profile/post-display-profile.component.html',
    controller: PostDisplayProfileController,
    controllerAs: 'vm',
    bindings: {}
}
