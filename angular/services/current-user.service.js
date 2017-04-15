export class CurrentUserService {
    constructor($auth, API) {
        'ngInject';
        this.$auth = $auth;
        this.data = {};
    }

    get() {
        return data;
    }

    isAuthenticated() {
        return this.$auth.isAuthenticated();
    }
}

