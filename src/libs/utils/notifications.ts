import {NativeModules} from 'react-native';
import config from '../../config';
const {Heartbeat} = NativeModules;
export const startService = () => {
  Heartbeat.startService(); // start background heartbeat
  setInterval(() => {
    const now = new Date().getTime();
    config.service.lastbeat = now;
    config.service.task();
  }, config.service.fgInterval);
};

export const HeartbeatScheduler = async () => {
  const now = new Date().getTime();
  if (now - config.service.lastbeat >= config.service.bgInterval) {
    config.service.lastbeat = now;
    config.service.task();
  }
};
