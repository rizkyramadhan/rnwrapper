import React from 'react';
const {Navigation} = require('react-native-navigation');

export default function (
  name: string,
  component: React.Component | React.FunctionComponent,
): object {
  Navigation.registerComponent(name, () => component);

  return component;
}
