import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import DescriptionPage from './components/description-page-component/description-page-component';
import LandingPage from './components/landing-page-component/landing-page-component';
import Menu from './components/menu-component/menu-component';
import MyWorkPage from './components/my-work-page-component/my-work-page-component';

const {height} = Dimensions.get('screen');

const App = () => {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [activeButton, setactiveButton] = useState('home');

  const setScroll = (section: string) => {
    if (scrollViewRef.current) {
      if (section == 'home') {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      }
      if (section == 'about') {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 700,
          animated: true,
        });
      }
      if (section == 'work') {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 1550,
          animated: true,
        });
      }
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    if (scrollOffset < 700) {
      setactiveButton('home');
    }
    if (scrollOffset < 1550) {
      setactiveButton('about');
    } else {
      setactiveButton('work');
    }
  };

  return (
    <SafeAreaProvider style={{flex: 1, overflow: 'hidden'}}>
      <Menu
        animHeaderValue={scrollOffsetY}
        onMenuButtonPress={setScroll}
        activeButtonName={activeButton}></Menu>
      <SafeAreaView style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onScroll={handleScroll}>
          <View style={styles.container}>
            <View style={styles.center}>
              <LandingPage></LandingPage>
              <DescriptionPage></DescriptionPage>
              <MyWorkPage></MyWorkPage>
              <View style={{height: '50%'}}></View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    fontFamily: 'NotoSans-Regular',
  },
  center: {
    flex: 1,
    textAlign: 'center',
  },
});

export default App;
