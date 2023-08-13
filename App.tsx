//@ts-nocheck
import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ContactPage from './components/contact-page-component/contact-page-component';
import DescriptionPage from './components/description-page-component/description-page-component';
import Footer from './components/footer-component/footer-component';
import LandingPage from './components/landing-page-component/landing-page-component';
import Menu from './components/menu-component/menu-component';
import MyWorkPage from './components/my-work-page-component/my-work-page-component';
import {
  ThemeContextProvider,
  ThemeContext,
} from './components/theme-manager-component/theme-provider-component';
import {Scrollbars} from 'react-custom-scrollbars';
import PhoneMenu from './components/phone-menu-component/phone-menu-component';
import MyWorkPagePhone from './components/my-work-component-phone/my-work-component-phone';
import ContactPage from './components/contact-page-component/contact-page-component';
import ContactPagePhone from './components/contact-page-phone-component/contact-page-phone-component';

const {height} = Dimensions.get('screen');
console.log(height);

const App = () => {
  const scrollViewRef = useRef<Scrollbars | null>(null);
  const menuRef = useRef<any>(null);
  const {primaryColor, secondaryColor} = useContext(ThemeContext);
  const [backgroundColor, setBackgroundColor] = useState(primaryColor);
  const scrollAnimation = new Animated.Value(0);
  const scrollAnimationDuration = 500;

  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 1000);
  useEffect(() => {
    const handleWindowResize = () => {
      setIsPhoneScreen(window.innerWidth < 1000);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const setScroll = (section: string) => {
    if (scrollViewRef.current) {
      scrollAnimation.setValue(scrollViewRef.current.getScrollTop());
      if (section == 'home') {
        Animated.timing(scrollAnimation, {
          toValue: 0,
          duration: scrollAnimationDuration,
          useNativeDriver: false,
        }).start();
      }
      if (section == 'about') {
        Animated.timing(scrollAnimation, {
          toValue: 700,
          duration: scrollAnimationDuration,
          useNativeDriver: false,
        }).start();
      }
      if (section == 'work') {
        Animated.timing(scrollAnimation, {
          toValue: 1420,
          duration: scrollAnimationDuration,
          useNativeDriver: false,
        }).start();
      }
      if (section == 'contact') {
        Animated.timing(scrollAnimation, {
          toValue: 2100,
          duration: scrollAnimationDuration,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  scrollAnimation.addListener(animation => {
    scrollViewRef.current.scrollTop(animation.value);
  });

  const handleScroll = values => {
    const scrollOffset = values.scrollTop;
    if (scrollOffset < 700) {
      menuRef.current.setActiveButtonOnScroll('home');
    } else if (scrollOffset < 1350) {
      menuRef.current.setActiveButtonOnScroll('about');
    } else if (scrollOffset < 1700) {
      menuRef.current.setActiveButtonOnScroll('work');
    } else {
      menuRef.current.setActiveButtonOnScroll('contact');
    }
  };

  const setBackgrdounColor = (isEnabled: boolean) => {
    setBackgroundColor(isEnabled ? primaryColor : secondaryColor);
  };

  const styles = StyleSheet.create({
    container: {
      height: isPhoneScreen ? 900 : '100%',
      width: window.innerWidth,
    },
    center: {
      flex: 1,
      height: '100%',
    },
  });

  return (
    <ThemeContextProvider>
      <SafeAreaProvider
        style={{
          flex: 1,
          overflow: 'hidden',
          borderColor: primaryColor,
          backgroundColor: backgroundColor,
          // width: windowWidth,
        }}>
        {!isPhoneScreen ? (
          <Menu
            onMenuButtonPress={setScroll}
            onThemeChange={setBackgrdounColor}
            ref={menuRef}></Menu>
        ) : (
          <PhoneMenu
            onMenuButtonPress={setScroll}
            onThemeChange={setBackgrdounColor}
            ref={menuRef}></PhoneMenu>
        )}
        <Scrollbars
          style={{
            // width: '',
            display: 'flex',
            height: !isPhoneScreen ? 655 : 800,
          }}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          onScrollFrame={handleScroll}
          renderView={props => (
            <div {...props} style={{...props.style, overflowX: 'hidden'}} />
          )}
          renderThumbVertical={props => (
            <div
              {...props}
              style={{
                ...props.style,
                overflowX: 'hidden',
                backgroundColor: backgroundColor == 'black' ? 'white' : 'grey',
                borderRadius: 200,
                opacity: 0.8,
              }}
            />
          )}>
          <View style={styles.container}>
            <LandingPage></LandingPage>
            <DescriptionPage></DescriptionPage>
            {!isPhoneScreen ? (
              <MyWorkPage></MyWorkPage>
            ) : (
              <MyWorkPagePhone></MyWorkPagePhone>
            )}
            {!isPhoneScreen ? (
              <ContactPage></ContactPage>
            ) : (
              <ContactPagePhone></ContactPagePhone>
            )}
            <Footer></Footer>
          </View>
        </Scrollbars>
      </SafeAreaProvider>
    </ThemeContextProvider>
  );
};

export default App;
