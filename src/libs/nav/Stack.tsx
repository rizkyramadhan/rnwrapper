import React from 'react';
const {Navigation} = require('react-native-navigation');

export default function (
  name: string,
  component: React.Component | React.FunctionComponent,
): object {
  Navigation.registerComponent(name, () => component);

  return {
    root: {
      stack: {
        children: [
          {
            component: {
              name,
            },
          },
        ],
        // options: {
        //   topBar: {visible: false, height: 0},
        // },
      },
    },
  };
}
