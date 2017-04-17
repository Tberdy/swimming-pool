export class FriendSelectionController {
    constructor(DialogService, API, parent, $timeout, $q, $log) {
        'ngInject';
        this.Dialog = DialogService;
        this.API = API;
        this.parent = parent;
        this.name = name;
        this.users = this.loadAll();
        this.parent = parent;
        //this.event = $event;
        this.timeout = $timeout;
        this.q = $q;
        this.log = $log;
        this.isDisabled = false;

    }
    save() {
//Logic here
        this.Dialog.hide("wesh");
    }

    cancel() {
//alert('Cancel Button Pressed');
        this.Dialog.cancel("nope");
    }
    //Load of all the users
     loadAll() {
     this.API.all('user/list').get('')
     .then((response) => {
     this.users = angular.copy(response.data.users);
     });
     }

// ******************************
// Internal methods
// ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    /*
    loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }
    */
    querySearch(query) {
       
        var results=[];
        var re=query+"+";
        var regex=new RegExp(re,"i");
        for (var k in this.users) {
            var display=this.users[k].firstname+" "+this.users[k].name;
            if(regex.test(display))
            {
                results.push(display);
            }
        }
        return results;
    }

    searchTextChange(text) {
        this.log.info('Text changed to ' + text);
    }

    selectedItemChange(item) {
        this.log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */

    newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    /**
     * Create filter function for a query string
     */
    createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };
    }
}
export const FriendsSelectionComponent = {
    controller: FriendSelectionController,
    controllerAs: 'vm',
    bindings: {}
}
