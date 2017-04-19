import {ContentQueryService} from './services/ContentQuery.service';
import {FriendsQueryService} from './services/friendsQuery.service';
import {CurrentUserService} from './services/current-user.service';
import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.service('ContentQueryService', ContentQueryService)
	.service('API', APIService)
        .service('CurrentUserService', CurrentUserService)
        .service('FriendsQueryService', FriendsQueryService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)
