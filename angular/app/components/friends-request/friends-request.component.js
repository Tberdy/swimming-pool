class FriendsRequestController{
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

export const FriendsRequestComponent = {
    templateUrl: './views/app/components/friends-request/friends-request.component.html',
    controller: FriendsRequestController,
    controllerAs: 'vm',
    bindings: {}
}
