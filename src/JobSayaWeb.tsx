import React from 'react';
import WrapperView from './libs/ui/WrapperView';
import {observer} from 'mobx-react-lite';
import {Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {job} from './JobSaya';

export default observer(() => {
  return (
    <>
      <Button
        onPress={() => {
          Navigation.pop('JOB_SAYA_TAB');
        }}
        title="Kembali"></Button>
      <WrapperView
        disableNav={true}
        url={job.url}
        style={job.style}
        onMessage={job.onMessage}
      />
    </>
  );
});
