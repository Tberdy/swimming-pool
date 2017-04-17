export class FriendSelectionController {
    constructor(DialogService, API, parent, name) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.parent = parent;
        this.name = name;
        this.usersList = [];
    }
    save() {
        //Logic here
        this.Dialog.hide("wesh");
    }

    cancel() {
        //alert('Cancel Button Pressed');
        this.Dialog.cancel("nope");
    }

    getUsersList() {
        this.API.all('user/list').get('')
                .then((response) => {
                    this.usersList = angular.copy(response.data.users);
                });
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
