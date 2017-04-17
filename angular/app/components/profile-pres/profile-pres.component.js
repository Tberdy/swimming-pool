class ProfilePresController{
    constructor($stateParams){
        'ngInject';

        this.id_user = $stateParams.id_user;
        this.profile = {
            id: 1,
            firstname: 'Thomas',
            name: 'Berdy',
            ppLink: 'img/example/thomas.jpg',
            gender: 1,
            birthdate: '06/06/1996'
        };
        
        this.profileContents = [
            {
                id: 1,
                type: 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                id: 2,
                type: 2,
                text: 'Donec venenatis sed erat et laoreet.',
                date: '06/06/1996'
            },
            {
                id: 3,
                type: 3,
                text: 'Ut at egestas purus.',
                file: 'img/example/thomas.jpg'
            }
        ];
    }

    $onInit(){
    }
}

export const ProfilePresComponent = {
    templateUrl: './views/app/components/profile-pres/profile-pres.component.html',
    controller: ProfilePresController,
    controllerAs: 'vm',
    bindings: {}
}
