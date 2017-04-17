export class FriendsQueryService{
    constructor(CurrentUserService,API){
        'ngInject';
        
        this.API=API;
        this.currentUser = CurrentUserService;
        alert("hum "+ this.currentUser.getUser());
        this.allUsers=this.loadUsers();
        
        this.currentFriends=this.getFriends(this.currentUser.data.id);
    }
    getUser(){
        return this.CurrentUserService.getUser();
    }
    /*
     * {
     * "errors":false,
     * "data":{"friends":[{
     *      "id":5,
     *      "firstname":"Alain",
     *      "name":"Berrier",
     *      "email":"alain.rarman@hotmail.fr",
     *      "gender":1,
     *      "birthdate":"2017-05-03",
     *      "created_at":"2017-04-15 18:13:13",
     *      "updated_at":"2017-04-15 18:13:13",
     *      "pivot":{
     *          "id_from":1,
     *          "id_to":5
                    }
                }]
            }
    }
     */
    getFriends(userId) {
        
        this.API.all('user/friends/list').get('', {
            id: userId
        }).then((response) => {
            return angular.copy(response.data.friends);
        });
    }
    
    addFriends(friendId)
    {
        this.API.all('user/friends/add').get('', {
            id: this.currentUser.data.id,
            friend_id: friendId
        }).then((response) => {
            return angular.copy(response.data.friends);
        });
    }
    //{"errors":false,
    //"data":{
    //      "users":[{
    //          "id":1,
    //          "firstname":"Thomas",
    //          "name":"Berdy",
    //          "email":"tberdy@hotmail.fr",
    //          "gender":1,
    //          "birthdate":"1996-06-06",
    //          "created_at":"2017-04-08 23:13:45",
    //          "updated_at":"2017-04-08 23:13:45"}
    //          ,{
    //          "id":5,
    //          "firstname":"Alain",
    //          "name":"Berrier",
    //          "email":"alain.rarman@hotmail.fr",
    //          "gender":1,"birthdate":"2017-05-03",
    //          "created_at":"2017-04-15 18:13:13",
    //          "updated_at":"2017-04-15 18:13:13"},
    //          {
    //          "id":6,"firstname":"Taha",
    //          "name":"MIYARA","email":"miyara.taha@gmail.com",
    //          "gender":1,"birthdate":"1996-05-08",
    //          "created_at":"2017-04-15 18:32:05",
    //          "updated_at":"2017-04-15 18:32:05"
    //          }
    //          ]
    // 
    loadUsers() {
        this.API.all('user/list').get('')
                .then((response) => {
                    return angular.copy(response.data.users);
                });
    }
}

