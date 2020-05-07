import React from 'react';
import BottomBar from './libs/nav/BottomBar';
import WrapperView from './libs/ui/WrapperView';

export const url = 'https://butuhapa.calmy.id';
const wrapperStyle = {flex: 1, width: '100%', backgroundColor: 'red'};
export default BottomBar([
  {
    label: 'Home',
    icon: require('./assets/icons/home.png'),
    selectedIcon: require('./assets/icons/home-s.png'),
    component: () => {
      return <WrapperView url={url} style={wrapperStyle} />;
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
        />
      );
    },
  },
  {
    label: 'Job Saya',
    icon: require('./assets/icons/post.png'),
    selectedIcon: require('./assets/icons/post-s.png'),
    component: () => {
      return <WrapperView url={`${url}/my-account/`} style={wrapperStyle} />;
    },
  },
  {
    label: 'Order',
    icon: require('./assets/icons/order.png'),
    selectedIcon: require('./assets/icons/order-s.png'),
    component: () => {
      return (
        <WrapperView url={`${url}/my-account/shopping/`} style={wrapperStyle} />
      );
    },
  },
  {
    label: 'My Account',
    icon: require('./assets/icons/user.png'),
    selectedIcon: require('./assets/icons/user-s.png'),
    component: () => {
      return (
        <WrapperView
          url={`${url}/wp-login.php?action=logout`}
          style={wrapperStyle}
        />
      );
    },
  },
]);
