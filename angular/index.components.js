import {EventDisplayComponent} from './app/components/event-display/event-display.component';
import {PostDisplayComponent} from './app/components/post-display/post-display.component';
import {FriendsInvitationComponent} from './app/components/friends-invitation/friends-invitation.component';
import {ProfilePresComponent} from './app/components/profile-pres/profile-pres.component';
import {FriendsRequestComponent} from './app/components/friends-request/friends-request.component';
import {FriendsListComponent} from './app/components/friends-list/friends-list.component';
import {AppHeaderComponent} from './app/components/app-header/app-header.component';
import {AppRootComponent} from './app/components/app-root/app-root.component';
import {AppShellComponent} from './app/components/app-shell/app-shell.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';

angular.module('app.components')
	.component('eventDisplay', EventDisplayComponent)
	.component('postDisplay', PostDisplayComponent)
	.component('friendsInvitation', FriendsInvitationComponent)
	.component('profilePres', ProfilePresComponent)
	.component('friendsRequest', FriendsRequestComponent)
	.component('friendsList', FriendsListComponent)
	.component('appHeader', AppHeaderComponent)
	.component('appRoot', AppRootComponent)
	.component('appShell', AppShellComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent);

