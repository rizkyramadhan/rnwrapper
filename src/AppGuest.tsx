import React, {useEffect} from 'react';
import {Navigation} from 'react-native-navigation';
import config from './config';
import BottomBar from './libs/nav/BottomBar';
import WrapperView from './libs/ui/WrapperView';
import AppUser from './AppUser';

const wrapperStyle = {flex: 1, width: '100%'};
const url = config.url;

const onMessage = (event: any) => {
  const {data} = event.nativeEvent;
  const res = JSON.parse(data);

  if (res.login === 'y' && config.isGuest) {
    config.isGuest = false;
    Navigation.setRoot(AppUser);
  }
  event.session.cookies = res.cookies;
  config.cookies = res.cookies;
  event.meta.refreshing = false;
};

export default BottomBar([
  {
    label: 'Butuh Apa',
    icon: require('./assets/icons/home.png'),
    selectedIcon: require('./assets/icons/home-s.png'),
    component: () => {
      useEffect(() => {
        config.isGuest = true;
      }, []);

      return (
        <WrapperView url={url} style={wrapperStyle} onMessage={onMessage} />
      );
    },
  },
  {
    label: 'Login',
    icon: require('./assets/icons/user.png'),
    selectedIcon: require('./assets/icons/user-s.png'),
    component: () => {
      return (
        <WrapperView
          url={`${url}/wp-login.php`}
          style={wrapperStyle}
          onMessage={onMessage}
        />
      );
    },
  },
]);
