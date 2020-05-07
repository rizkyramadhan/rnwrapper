import PushNotification from 'react-native-push-notification';
export default {
  url: `https://butuhapa.calmy.id`,
  service: {
    lastbeat: 0,
    fgInterval: 5000,
    bgInterval: 10000,
    task: async () => {
      const msg = `heartbeat! ${new Date().toString()}`;
      console.log(msg);
      // PushNotification.localNotification({
      //   title: 'Anda mendapatkan pesan',
      //   message: msg, // (required)
      //   playSound: false, // (optional) default: true
      // });
    },
  },
};
