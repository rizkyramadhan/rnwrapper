import React from 'react';
import {Navigation} from 'react-native-navigation';
import AppGuest from './AppGuest';
import config from './config';
import JobSaya from './JobSaya';
import BottomBar from './libs/nav/BottomBar';
import WrapperView from './libs/ui/WrapperView';
import MyAccount from './MyAccount';

const wrapperStyle = {flex: 1, width: '100%'};
const url = config.url;

setInterval(() => {
  Navigation.mergeOptions('MY_ACCOUNT_TAB', {
    bottomTab: {
      badge: config.notif.messages * 1 > 0 ? config.notif.messages : '',
    },
  });

  Navigation.mergeOptions('NOTIF_TAB', {
    bottomTab: {
      badge:
        config.notif.notifications * 1 > 0 ? config.notif.notifications : '',
    },
  });
}, 1000);

const onMessage = (event: any) => {
  const {data} = event.nativeEvent;
  const res = JSON.parse(data);

  if (res.role) {
    if (res.role === 'buyer' && config.role !== 'buyer') {
      Navigation.setRoot(menu(false));
    } else if (res.role === 'seller' && config.role !== 'seller') {
      Navigation.setRoot(menu(true));
    }
    config.role = res.role;
  }

  if (res.login === 'n' && !config.isGuest) {
    config.isGuest = true;
    Navigation.setRoot(AppGuest);
  }
  event.session.cookies = res.cookies;
  config.cookies = res.cookies;
  event.meta.refreshing = false;
};

const menu = (job = false) => {
  return BottomBar([
    {
      label: 'Home',
      icon: require('./assets/icons/home.png'),
      selectedIcon: require('./assets/icons/home-s.png'),
      component: () => {
        return (
          <WrapperView url={url} style={wrapperStyle} onMessage={onMessage} />
        );
      },
    },
    {
      label: 'Notif',
      icon: require('./assets/icons/notif.png'),
      selectedIcon: require('./assets/icons/notif-s.png'),
      component: () => {
        return (
          <WrapperView
            url={`${url}/my-account/all-notifications/`}
            style={wrapperStyle}
            onMessage={onMessage}
          />
        );
      },
    },
    !job
      ? undefined
      : {
          label: 'Job Saya',
          icon: require('./assets/icons/post.png'),
          selectedIcon: require('./assets/icons/post-s.png'),
          component: () => {
            return <JobSaya style={wrapperStyle} onMessage={onMessage} />;
          },
        },
    {
      label: 'Order',
      icon: require('./assets/icons/order.png'),
      selectedIcon: require('./assets/icons/order-s.png'),
      component: () => {
        return (
          <WrapperView
            url={`${url}/my-account/shopping/`}
            style={wrapperStyle}
            onMessage={onMessage}
          />
        );
      },
    },
    {
      label: 'My Account',
      icon: require('./assets/icons/user.png'),
      selectedIcon: require('./assets/icons/user-s.png'),
      component: () => {
        return <MyAccount style={wrapperStyle} onMessage={onMessage} />;
      },
    },
  ]);
};

export default menu();
