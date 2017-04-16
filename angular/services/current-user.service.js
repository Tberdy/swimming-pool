export class CurrentUserService {
    constructor($auth, API) {
        'ngInject';
        this.$auth = $auth;
        this.API = API;
        this.data = {};
        
        if(this.isAuth()) this.getUser();
    }
    
    getUser() {
        this.API.all('user').get('')
                .then((response) => {
                    this.data = angular.copy(response);
                    console.log(response);
                });
    }
    
    isAuth() {
        return this.$auth.isAuthenticated();
    }
}

