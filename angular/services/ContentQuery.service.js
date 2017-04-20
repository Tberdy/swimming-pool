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
    getCommentsPromise(userId,contentId)
    {
        return this.API.all('comments/list').get('', {
            id: userId,
            content_id:contentId
        })
    }
    getNumberOfComments(contentId)
    {
        return this.API.all('comments/count').get('', {
            content_id:contentId
        })
    }
    addCommentPromise(userId,contentId,text)
    {
        return this.API.all('comments/add').post('', {
            id: userId,
            content_id:contentId,
            text:text
        })
    }
}