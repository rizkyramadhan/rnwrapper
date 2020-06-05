import { observable } from 'mobx';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import config from './config';
import Stack from './libs/nav/Stack';
import JobSayaWeb from './JobSayaWeb';
export const job = observable({
  url: '',
  style: null as any,
  onMessage: null as any,
});

Stack('Job Saya Web', JobSayaWeb);

export default ({style, onMessage}: any) => {
  const [msg, setMsg] = useState(0);
  job.style = style;
  job.onMessage = onMessage;
  const nav = (to: string) => {
    job.url = config.url + to;
    Navigation.push('JOB_SAYA_TAB', {
      component: {
        name: 'Job Saya Web', // Push the screen registered with the 'Settings' key
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
          Menu Job Saya
        </Text>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              nav('/my-account/');
            }}
            title="Posting Job"
          />
        </View>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => {
              nav('/my-account/sales/');
            }}
            title="Pekerjaan Saya"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
