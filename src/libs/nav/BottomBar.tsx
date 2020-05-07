import React from 'react';
import map from 'lodash.map';

const {Navigation} = require('react-native-navigation');

export default function (
  menus: {
    label: string;
    icon: string;
    selectedIcon?: string;
    badge?: string;
    component: React.Component | React.FunctionComponent;
  }[],
): object {
  map(menus, (menu) => {
    const id = menu.label.replace(/[\W_]+/g, '_').toUpperCase();
    Navigation.registerComponent(id, () => menu.component);
  });

  return {
    root: {
      bottomTabs: {
        id: 'BOTTOM_TAB_NAV',
        children: map(menus, (menu) => {
          const id = menu.label.replace(/[\W_]+/g, '_').toUpperCase();
          return {
            stack: {
              id: `${id}_TAB`,
              children: [
                {
                  component: {
                    id: `${id}_SCREEN`,
                    name: id,
                  },
                },
              ],
              options: {
                bottomTab: {
                  badge: menu.badge,
                  icon: menu.icon,
                  selectedIcon: menu.selectedIcon,
                  text: menu.label,
                },
                topBar: {visible: false, height: 0},
              },
            },
          };
        }),
        options: {
          bottomTabs: {
            tabsAttachMode: 'onSwitchToTab',
            titleDisplayMode: 'alwaysShow',
          },
        },
      },
    },
  };
}
