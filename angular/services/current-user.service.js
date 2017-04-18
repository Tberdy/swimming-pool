export class CurrentUserService {
    constructor($auth, API) {
        'ngInject';
        this.$auth = $auth;
        this.API = API;
        this.data = null;
        this.allUsers=null;
        this.getAllUsers();
        if (this.isAuth())
            this.retrieveUser();
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
    retrieveUser() {
        return this.API.all('user').get('')
                .then((response) => {
                    this.data = angular.copy(response);
                    return response;
                });
    }
    getUserPromise() {
        return this.API.all('user').get('');
    }
    getAllUsersPromise()
    {
        return this.API.all('user/list').get('');
    }
    getAllUsers()
    {
        if (this.allUsers !== null) {
            return this.data;
        } else {
            return {
                getAllUsers: this.retrieveAllUsers()
            };
        }
    }
    retrieveAllUsers() {
        return this.API.all('user/list').get('')
                .then((response) => {
                    this.allUsers = angular.copy(response.data.users);
                    //console.log("service: " + response);
                    return response.data.users;
                });
    }
    isAuth() {
        return this.$auth.isAuthenticated();
    }

}

