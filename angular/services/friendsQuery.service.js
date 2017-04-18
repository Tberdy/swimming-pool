export class FriendsQueryService {
    constructor(API) {
        'ngInject';

        this.API = API;

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
    getInvitationsPromise(userId)
    {
        return this.API.all('user/friends/invitations/list').get('', {
            id: userId
        })
    }
    getRequestsPromise(userId)
    {
        return this.API.all('user/friends/requests/list').get('', {
            id: userId
        })
    }
    getFriendsPromise(userId)
    {
        return this.API.all('user/friends/list').get('', {
            id: userId
        });
    }
    addFriendsPromise(userId,friendId)
    {
        return this.API.all('user/friends/add').get('', {
            id: userId,
            friend_id: friendId
        });
    }
    deleteFriend(friendId, userId)
     {
     this.API.all('user/friends/delete').post('', {
     
     id: userId,
     friend_id: friendId
     })
     
     }
    /*
     getFriends(userId) {
     
     return this.API.all('user/friends/list').get('', {
     id: userId
     }).then((response) => {
     angular.copy(response.data.friends);
     return response.data.friends;
     });
     }
     addFriends(friendId)
     {
     return this.API.all('user/friends/add').get('', {
     id: this.currentUser.data.id,
     friend_id: friendId
     }).then((response) => {
     angular.copy(response.data.friends);
     return response.data.friends;
     });
     }
     */

}

