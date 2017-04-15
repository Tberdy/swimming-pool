import {CurrentUserService} from './services/current-user.service';
import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.service('API', APIService)
        .service('CurrentUserService', CurrentUserService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)
