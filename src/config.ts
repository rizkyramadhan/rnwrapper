import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import {Navigation} from 'react-native-navigation';

const config = {
  url: `https://butuhapa.calmy.id`,
  isGuest: true,
  cookies: '',
  notif: {} as any,
  role: '',
  service: {
    lastbeat: 0,
    fgInterval: 2000,
    bgInterval: 60000,
    task: async () => {
      const bodyFormData = new FormData();
      bodyFormData.append('action', 'check_live_notifications');
      const res = await axios({
        method: 'post',
        url: `${config.url}/wp-content/themes/wpjobster/ajax-functions/light-ajax.php`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      let notif = config.notif;
      if (notif.messages_time !== res.data.messages_time) {
        config.notif = res.data;
        let msg = '';
        let a = config.notif.messages;
        if (a * 1 > 0) {
          msg += `${a} pesan masuk.`;
          
        } 

        let b = config.notif.notifications;
        if (b * 1 > 0) {
          msg += `${b} notifikasi baru.`;
        }

        if (msg) {
          PushNotification.localNotification({
            title: 'Notifikasi ButuhApa',
            message: msg, // (required)
            playSound: true, // (optional) default: true
          });
        }
      }

      // const msg = `heartbeat! ${new Date().toString()}`;
      // console.log(msg);
    },
  },
};

export default config;
