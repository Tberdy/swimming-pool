class FriendsListController {
    constructor(DialogService, API, CurrentUserService) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.user = CurrentUserService;
    }

    getFriends() {
        this.API.all('user/friends/list').get('', {
            id: this.user.data.id
        }).then((response) => {
            this.friends = angular.copy(response.data.friends);
        });
    }

    addFriend() {
        this.API.all('user/friends/add').get('', {
            id: this.user.data.id,
            friend_id: ''
        }).then((response) => {
            this.friends = angular.copy(response.data.friends);
        });
    }

    $onInit() {
        this.friends = [];
        this.getFriends();
        this.people = [
            {name: 'Taha Miyara', img: 'img/example/taha.jpg', newMessage: true},
            {name: 'Thomas Berdy', img: 'img/example/thomas.jpg', newMessage: false},
            {name: 'Mark Zuckerberg', img: 'img/example/mark.jpg', newMessage: false}
        ];
        /*
         angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
         .config(function ($mdIconProvider) {
         $mdIconProvider
         .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
         .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
         .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
         .defaultIconSet('img/icons/sets/core-icons.svg', 24);
         })
         */
    }

    doSecondaryAction(event) {
        this.Dialog.show(
                this.Dialog.alert()
                .title('Secondary Action')
                .textContent('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
                );
    }

    /*
     goToPerson(person, event) {
     this.Dialog.show(
     this.Dialog.alert('Test');
     
     .title('Navigating')
     .textContent('Wesh ' + person)
     .ariaLabel('Person inspect demo')
     .ok('Neat!')
     .targetEvent(event)
     );
     
     }
     */
    goToPerson(person, event) {
        this.Dialog.fromTemplate('friendSelection');
    }
    navigateTo(to, event) {
        this.Dialog.show(
                this.Dialog.alert()
                .title('Navigating')
                .textContent('Imagine being taken to ' + to)
                .ariaLabel('Navigation demo')
                .ok('Neat!')
                .targetEvent(event)
                );
    }

    doPrimaryAction(event) {
        this.Dialog.show(
                this.Dialog.alert()
                .title('Primary Action')
                .textContent('Primary actions can be used for one click actions')
                .ariaLabel('Primary click demo')
                .ok('Awesome!')
                .targetEvent(event)
                );
    }
}

export const FriendsListComponent = {
    templateUrl: './views/app/components/friends-list/friends-list.component.html',
    controller: FriendsListController,
    controllerAs: 'vm',
    bindings: {}
}
