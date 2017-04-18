class FriendsInvitationController{
    constructor(DialogService) {
        'ngInject';
        this.Dialog = DialogService;
    }

    $onInit() {
        this.people = [
            {name: 'Taha Miyara', img: 'img/example/taha.jpg', selected: false},
            {name: 'Thomas Berdy', img: 'img/example/thomas.jpg', selected: false},
            {name: 'Mark Zuckerberg', img: 'img/example/mark.jpg', selected: false}
        ];
    }
}

export const FriendsInvitationComponent = {
    templateUrl: './views/app/components/friends-invitation/friends-invitation.component.html',
    controller: FriendsInvitationController,
    controllerAs: 'vm',
    bindings: {}
}
