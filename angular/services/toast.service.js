export class ToastService {
    constructor($mdToast) {
        'ngInject';

        this.$mdToast = $mdToast;
        this.waitingToasts = [];
        this.delay = 6000;
        this.position = 'top right';
        this.action = 'OK';
    }

    show(content) {
        if (!content) {
            return false;
        }

        return this.$mdToast.show(
                this.$mdToast.simple()
                .content(content)
                .position(this.position)
                .action(this.action)
                .hideDelay(this.delay)
                );
    }
    addToast(content)
    {
        this.waitingToasts.push(content);
    }
    displayToasts(){
        while(this.waitingToasts.length>0)
        {
            var a=this.waitingToasts.shift();
            this.show(a);
        }
    }
    error(content) {
        if (!content) {
            return false;
        }

        return this.$mdToast.show(
                this.$mdToast.simple()
                .content(content)
                .position(this.position)
                .theme('warn')
                .action(this.action)
                .hideDelay(this.delay)
                );
    }
}
