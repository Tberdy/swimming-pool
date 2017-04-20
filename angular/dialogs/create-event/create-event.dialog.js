export class CreateEventController{
    constructor(DialogService,ContentQueryService,ToastService,$state,user){
        'ngInject';
        this.DialogService = DialogService;
        this.ContentQuery=ContentQueryService;
        this.toast=ToastService;
        this.$state=$state;
        this.user=user;
        this.event={
          text:"",
          date:new Date(),
          hour:"",
          minute:"",
          id:this.user.id
        };
        this.hours=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
        this.minutes=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];
        
    }
    parseDate()
    {
        this.event.date.setHours(parseInt(this.event.hour));
        this.event.date.setMinutes(parseInt(this.event.minute));
        return this.event.date.toString();
        
    }
    save(){
        //Logic here
        
        let promise = this.ContentQuery.addEventPromise(this.user.id,this.event.text,this.parseDate());
        promise.then((response) => {
            this.$state.reload();
            this.toast.addToast("Événement crée !");
            this.DialogService.hide();
        });
        
    }

    cancel(){
        //this.parseDate();
        this.DialogService.cancel();
    }
}

