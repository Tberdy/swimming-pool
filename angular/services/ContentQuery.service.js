export class ContentQueryService {
    constructor(API) {
        'ngInject';
        this.API = API;
        //
    }

    getContentPromise(userId)
    {
        return this.API.all('content/list').get('', {
            user_id: userId
        })
    }
    getPostsPromise(userId)
    {
        return this.API.all('content/list/posts').get('', {
            user_id: userId
        })
    }
    getEventsPromise(userId)
    {
        return this.API.all('content/list/events').get('', {
            user_id: userId
        })
    }
    getPicturesPromise(userId)
    {
        return this.API.all('content/list/pictures').get('', {
            user_id: userId
        })
    }
}