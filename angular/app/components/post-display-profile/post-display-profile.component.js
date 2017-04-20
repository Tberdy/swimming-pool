import {ProfileEditController} from '../../../dialogs/profile-edit/profile-edit.dialog.js';
import {CreateContentController} from '../../../dialogs/create-content/create-content.dialog.js';

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
    createContentDialog()
    {
        let options = {
            controller: CreateContentController,
            controllerAs: 'vm',
            locals:
                    {
                        user: this.user
                    }
        }

        this.Dialog.fromTemplate('create-content', options);
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
            angular.forEach(this.data, function (value, key) {
                this.countComments(value.id, key);
            }.bind(this));
            this.sortPosts();
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
}

export const PostDisplayProfileComponent = {
    templateUrl: './views/app/components/post-display-profile/post-display-profile.component.html',
    controller: PostDisplayProfileController,
    controllerAs: 'vm',
    bindings: {}
}
