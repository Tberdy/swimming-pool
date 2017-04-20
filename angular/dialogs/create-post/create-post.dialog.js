export class CreatePostController{
    constructor(DialogService,ContentQueryService,ToastService,$state,user){
        'ngInject';
        this.DialogService = DialogService;
        this.ContentQuery=ContentQueryService;
        this.toast=ToastService;
        this.$state=$state;
        this.message="";
        this.user=user;
        this.post={
          text:"",
          id:this.user.id
        };
        
    }
    isEmpty()
    {
        if (this.post.text === null || this.post.text === "")
            return true;
        return false;
    }
    save(){
        //Logic here
        this.message="";
        if(this.isEmpty())
        {
            this.message="Votre statut est vide !"
            return;
        }
        let promise = this.ContentQuery.addPostPromise(this.post.id,this.post.text,);
        promise.then((response) => {
            this.$state.reload();
            this.toast.addToast("Statut crée !");
            this.DialogService.hide();
        });
    }

    cancel(){
        this.DialogService.cancel();
    }
}

