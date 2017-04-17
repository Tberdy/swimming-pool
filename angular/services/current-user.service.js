export class CurrentUserService {
    constructor($auth, API) {
        'ngInject';
        this.$auth = $auth;
        this.API = API;
        this.data = null;
        this.getAllUsers();
        if (this.isAuth())
            this.retrieveUser();
    }

    retrieveUser() {
        return this.API.all('user').get('')
                .then((response) => {
                    this.data = angular.copy(response);
                    return response;
                });
    }

    getUser() {
        if (this.data !== null) {
            return this.data;
        } else {
            return {
                getUser: this.retrieveUser()
            };
        }


    }
    getAllUsers() {
        
        return this.API.all('user/list').get('')
                .then((response) => {
                    this.allUsers = angular.copy(response.data.users);
                    console.log("service: " + response);
                    return response.data.users;

                });
    }
    isAuth() {
        return this.$auth.isAuthenticated();
    }

}

