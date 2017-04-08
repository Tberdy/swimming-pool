import {DatepickerConfig} from './config/Datepicker.config';
import {RoutesConfig} from './config/routes.config';
import {LoadingBarConfig} from './config/loading_bar.config';
import {ThemeConfig} from './config/theme.config';
import {SatellizerConfig} from './config/satellizer.config';

angular.module('app.config')
        .config(DatepickerConfig)
        .config(RoutesConfig)
        .config(LoadingBarConfig)
        .config(ThemeConfig)
        .config(SatellizerConfig);
