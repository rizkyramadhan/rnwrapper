import {observable} from 'mobx';
import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import config from './config';
import Stack from './libs/nav/Stack';
import MyAccountWeb from './MyAccountWeb';

export const akun = observable({
  url: '',
  style: null as any,
  onMessage: null as any,
});

Stack('My Account Web', MyAccountWeb);

export default ({style, onMessage}: any) => {
  const [msg, setMsg] = useState(0);
  akun.style = style;
  akun.onMessage = onMessage;
  const nav = (to: string) => {
    akun.url = config.url + to;
    Navigation.push('MY_ACCOUNT_TAB', {
      component: {
        name: 'My Account Web', // Push the screen registered with the 'Settings' key
      },
    });
  };

  useEffect(() => {
    setInterval(() => {
      setMsg(config.notif.messages);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          padding: 10,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 10}}>
          Menu Akun
        </Text>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              config.notif.messages = '';
              Navigation.mergeOptions('MY_ACCOUNT_TAB', {
                bottomTab: {
                  badge: '',
                },
              });
              nav('/my-account/private-messages/');
            }}
            title={`Pesan Masuk ${
              msg * 1 > 0
                ? ' - ' + msg + ' baru'
                : ''
            }`}
          />
        </View>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              nav('/my-account/settings/');
            }}
            title="Pengaturan"
          />
        </View>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              nav('/user/butuhapa/');
            }}
            title="Profil Publik"
          />
        </View>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              nav('/wp-login.php?action=logout');
            }}
            title="Logout"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
