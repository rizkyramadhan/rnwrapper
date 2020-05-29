import React from 'react';
import WrapperView from './libs/ui/WrapperView';
import {observer} from 'mobx-react-lite';
import {akun} from './MyAccount';
import {Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default observer(() => {
  return (
    <>
      <Button
        onPress={() => {
          Navigation.pop('MY_ACCOUNT_TAB');
        }}
        title="Kembali Ke Menu Akun"></Button>
      <WrapperView
        disableNav={true}
        url={akun.url}
        style={akun.style}
        onMessage={akun.onMessage}
      />
    </>
  );
});
