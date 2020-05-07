import {observable} from 'mobx';
import {observer, useLocalStore} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {
  BackHandler,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useAsyncEffect} from '../utils/useAsyncEffect';
import ProgressBar from './ProgressBar';

export const session = observable({
  lastbeat: new Date().getTime(),
  cookies: '',
  data: null,
});

export default observer(({url, style}: {url: string; style?: any}) => {
  const meta = useLocalStore(() => ({
    url,
    height: Dimensions.get('screen').height,
    refreshing: false,
    refreshEnabled: true,
    progress: {
      show: false,
      value: 0,
      ival: 0,
    },
    canGoBack: false,
  }));
  const ref = useRef(null as any);

  const onNavigate = (nav: WebViewNavigation) => {
    meta.canGoBack = nav.canGoBack;

    if (nav.loading) {
      clearInterval(meta.progress.ival);
      meta.progress.show = false;
      meta.progress.value = 0;
      meta.progress.ival = setInterval(() => {
        meta.progress.show = true;
        if (meta.progress.value < 1) {
          meta.progress.value += 0.05;
        } else {
          clearInterval(meta.progress.ival);
          setTimeout(() => {
            meta.progress.show = false;
          }, 2000);
        }
      }, 100);
    } else {
      meta.progress.value = 1;
      setTimeout(() => {
        meta.progress.show = false;
      }, 2000);
    }
  };

  useAsyncEffect(async () => {
    const backAction = () => {
      const wv = ref.current;
      if (meta.canGoBack) {
        wv.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onMessage = (event: any) => {
    const {data} = event.nativeEvent;
    console.log(data);
    session.cookies = data;
    meta.refreshing = false;
  };

  return (
    <ScrollView
      onLayout={(e) => (meta.height = e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            meta.refreshing = true;
            const wv = ref.current;
            wv.reload();
          }}
          refreshing={meta.refreshing}
          enabled={true}
        />
      }
      style={{flex: 1, height: '100%', flexDirection: 'column', ...style}}>
      {meta.progress.show && <ProgressBar progress={meta.progress.value} />}
      <WebView
        onScroll={(e: any) => {
          meta.refreshEnabled = e.nativeEvent.contentOffset.y === 0;
        }}
        style={{width: '100%', height: meta.height, flex: 1}}
        source={{
          uri: meta.url,
          headers: {
            'x-cactiva': 'y',
          },
        }}
        sharedCookiesEnabled={true}
        ref={ref}
        onMessage={onMessage}
        onNavigationStateChange={onNavigate}
        // injectedJavaScript={`var CCPOS = function() {window.ReactNativeWebView.postMessage(document.cookie)};setInterval(CCPOS, 1000);CCPOS();true; `}
        onShouldStartLoadWithRequest={(request) => {
          // If we're loading the current URI, allow it to load
          if (request.url === meta.url) return true;
          // We're loading a new URL -- change state first
          meta.url = request.url;
          return false;
        }}
      />
    </ScrollView>
  );
});
