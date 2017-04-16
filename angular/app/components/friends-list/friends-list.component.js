class FriendsListController {
    constructor(DialogService) {
        'ngInject';

        this.Dialog = DialogService;
    }

    $onInit() {
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

    goToPerson(person, event) {
        this.Dialog.show(
                this.Dialog.alert()
                .title('Navigating')
                .textContent('Inspect ' + person)
                .ariaLabel('Person inspect demo')
                .ok('Neat!')
                .targetEvent(event)
                );
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
