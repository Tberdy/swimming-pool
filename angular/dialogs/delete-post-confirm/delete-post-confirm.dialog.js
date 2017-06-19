export class DeletePostConfirmController {
    constructor(DialogService, user, post, API,ToastService,$state) {
        'ngInject';
        this.user = user;
        this.post = post;
        this.API = API;
        this.$state=$state;
        this.toast = ToastService;
        this.DialogService = DialogService;
    }

    save() {

        this.API.all('content/delete').post('', {
            content_id: this.post.id
        }).then((response) => {
            this.toast.addToast("Post supprimé.");
            this.$state.reload();
            this.DialogService.hide();
        });
    }

    cancel() {
        this.DialogService.cancel();
    }
}

