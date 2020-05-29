import 'mobx-react-lite/batchingForReactNative';
import {Navigation} from 'react-native-navigation';
import App from './src/AppGuest';
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot(App);
});

import {startService} from './src/libs/utils/notifications';
import {AppRegistry} from 'react-native';
import {HeartbeatScheduler} from './src/libs/utils/notifications';
startService();
AppRegistry.registerHeadlessTask('Notification', () => HeartbeatScheduler);
