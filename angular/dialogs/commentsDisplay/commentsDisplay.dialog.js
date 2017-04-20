export class CommentsDisplayController {
    constructor(DialogService, ContentQueryService, CurrentUserService, ToastService, contentId, user,$state) {
        'ngInject';
        this.contentId = contentId;
        this.ContentQuery = ContentQueryService;
        this.DialogService = DialogService;
        this.CurrentUser = CurrentUserService;
        this.toast=ToastService;
        this.newComment = "";
        this.message="";
        this.$state=$state;
        this.data = [];
        this.users = [];
        this.user = user;
        this.comments = [];
        this.$onInit();

    }
    $onInit()
    {
        let promiseUsers = this.CurrentUser.getAllUsersPromise();
        promiseUsers.then((response) => {
            this.users = angular.copy(response.data.users);
            let promiseComments = this.ContentQuery.getCommentsPromise(this.user.id, this.contentId);
            promiseComments.then((response) => {
                this.comments = angular.copy(response.data.comments);
                this.associateComments();
                this.sortComments();

            });
        });
    }
    associateComments()
    {
        if (this.comments !== null && this.comments.length > 0)
        {
            for (var i in this.comments)
            {
                for (var j in this.users)
                {
                    if (this.comments[i].user_id === this.users[j].id)
                    {
                        this.data.push({
                            user: this.users[j],
                            content: this.comments[i]
                        });
                    }
                }
            }

        }
    }
    sortComments()
    {
        this.data.sort(function (a, b) {
            return Date.parse(b.content.created_at) - Date.parse(a.content.created_at);
        });
    }
    delay(comment)
    {
        if (comment === null || typeof comment === 'undefined')
            return 0;
        var diff = Date.now() - Date.parse(comment.content.created_at);

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
    isEmpty()
    {
        if (this.newComment === null || this.newComment === "")
            return "empty";
        return "unempty";
    }
    save() {
        //Logic here
        this.message="";
        if(this.newComment!="")
        {
            let promise = this.ContentQuery.addCommentPromise(this.user.id,this.contentId,this.newComment);
            promise.then((response) => {
                this.toast.addToast("Commentaire ajoutée !");
                this.DialogService.hide();
                this.$state.reload();
            });
        }
        else this.message="Votre commentaire est vide !";
        
    }

    cancel() {
        this.DialogService.cancel();
    }
}

