export class FriendSelectionController {
    constructor(DialogService, parent, $event, $timeout, $q, $log) {
        'ngInject';
        this.Dialog = DialogService;
        this.parent = parent;
        this.event = $event;
        this.timeout = $timeout;
        this.q = $q;
        this.log = $log;
        this.simulateQuery = false;
        this.isDisabled = false;

        // list of `state` value/display objects
        this.states = loadAll();
        this.querySearch = querySearch;
        this.selectedItemChange = selectedItemChange;
        this.searchTextChange = searchTextChange;

        this.newState = newState;

    }
    save() {
        //Logic here
        this.Dialog.hide("wesh");
    }

    cancel() {
        //alert('Cancel Button Pressed');
        this.Dialog.cancel("nope");
    }
}

export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
