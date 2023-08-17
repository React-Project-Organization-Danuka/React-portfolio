//@ts-nocheck

import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
  useEffect
} from 'react';
import {
  Animated,
  StyleSheet,
  Switch,
  View,
  Image,
  Pressable,
  Text,
} from 'react-native';
import LinkButton from '../link-button-component/link-button-component';
import MenuButton from '../menu-button-component/menu-button-component';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';
import sun_icon from '../../assets/icons/sun.svg';
import mooon_icon from '../../assets/icons/moon.svg';
import menu_icon from '../../assets/icons/menu.svg';
import PhoneMenuButton from '../phone-menu-button-component/phone-menu-button-component';

interface MenuProps {
  onMenuButtonPress: (data: string) => void;
  onThemeChange: (data: boolean) => void;
}

interface MenuRef {
  setActiveButtonOnScroll: (activeSection: string) => void;
}

const PhoneMenu = forwardRef<MenuRef, MenuProps>(
  ({onMenuButtonPress, onThemeChange}, ref) => {
    useImperativeHandle(ref, () => ({
      setActiveButtonOnScroll(activeSection) {
        setactiveButton(activeSection);
      },
    }));

    const [activeButton, setactiveButton] = useState('home');
    const {primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor} =
      useContext(ThemeContext);
    const [menuStatus, setMenuStatus] = useState(false);
    const menuIconAngle = new Animated.Value(0);
    const menuIconAngleFull = new Animated.Value(1);
    const [menuIconAngleValue, setMenuIconAngleValue] = useState(0);
    const [menuHeight, setMenuHeight] = useState('100%');
    const [isEnabled, setIsEnabled] = useState(localStorage.getItem('isEnabled') == 'true');

    useEffect(() => {
      if (localStorage.getItem('isEnabled') == 'true') {
        setIsEnabled(true);
        onThemeChange(!isEnabled);
        setPrimaryColor('black');
        setSecondaryColor('white');
      } else {
        setIsEnabled(false);
        onThemeChange(!isEnabled);
        setPrimaryColor('white');
        setSecondaryColor('black');
      }
    }, []);


    const handleButtonPress = (section: string) => {
      onMenuButtonPress(section);
    };

    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      localStorage.setItem('isEnabled',!isEnabled);
      setTimeout(() => {
        location.reload();        
      }, 100);
    };

    const handleMenuStatus = () => {
      if (menuStatus) {
        Animated.timing(menuIconAngleFull, {
          toValue: 0,
          duration: 175,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(menuIconAngle, {
          toValue: 1,
          duration: 175,
          useNativeDriver: false,
        }).start();
      }
      setMenuStatus(!menuStatus);
    };

    menuIconAngle.addListener(animation => {
      setMenuIconAngleValue(animation.value * 90);
      setMenuHeight(String(100 - animation.value * 100) + '%');
    });
    menuIconAngleFull.addListener(animation => {
      setMenuIconAngleValue(animation.value * 90);
      setMenuHeight(String(100 - animation.value * 100) + '%');
      console.log(menuHeight);
    });

    const styles = StyleSheet.create({
      mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
        backgroundColor: secondaryColor,
        alignItems: 'flex-start',
      },
      containerRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '50%',
      },
      containerLeft: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 20,
      },
      containerSwitch: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 0,
        marginRight: 50,
      },
      button: {
        width: 250,
        height: 50,
        backgroundColor: secondaryColor,
        justifyContent: 'space-evenly',
        borderBottomRightRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: primaryColor,
        borderTopWidth: 2,
      },
    });

    return (
      <Animated.View
        style={[
          styles.mainContainer,
          {borderWidth: 1, height: 55, borderBottomColor: primaryColor},
        ]}>
        <View>
          <Pressable
            onPress={handleMenuStatus}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginLeft: 10,
              width: 35,
              height: 35,
              transform: [{rotate: menuIconAngleValue + 'deg'}],
            }}>
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: primaryColor,
              }}
              source={menu_icon}></Image>
          </Pressable>
        </View>
        {menuHeight != '100%' && (
          <View style={{position: 'absolute', marginTop: 45, marginLeft: -1}}>
            <View
              style={{
                position: 'absolute',
                height: menuHeight,
                backgroundColor: primaryColor,
                width: '100%',
                zIndex: 10000,
                bottom: 0,
              }}></View>
            <PhoneMenuButton
              isCustom
              text="Home"
              scrollToSection="home"
              onMenuButtonPress={handleButtonPress}
              isActive={activeButton == 'home'}></PhoneMenuButton>
            <PhoneMenuButton
              text="About Me"
              scrollToSection="about"
              onMenuButtonPress={handleButtonPress}
              isActive={activeButton == 'about'}></PhoneMenuButton>
            <PhoneMenuButton
              text="My Work"
              scrollToSection="work"
              onMenuButtonPress={handleButtonPress}
              isActive={activeButton == 'work'}></PhoneMenuButton>
            <PhoneMenuButton
              text="Get In Touch"
              scrollToSection="contact"
              onMenuButtonPress={handleButtonPress}
              isActive={activeButton == 'contact'}></PhoneMenuButton>
            <View style={styles.button}>
              <LinkButton
                isPhoneMenu
                icon="cv"
                link="https://drive.google.com/file/d/1_QOMpt8rO0mmeiaHEsunTQ9EhJJZk26P/view?usp=sharing"></LinkButton>
              <LinkButton
                isPhoneMenu
                icon="insta"
                link="https://www.instagram.com/"></LinkButton>
              <LinkButton
                isPhoneMenu
                icon="github"
                link="https://github.com/Thaveesha222"></LinkButton>
              <LinkButton
                isPhoneMenu
                icon="linkedin"
                link="https://www.linkedin.com/in/danukathaveesha-72aa431a4/"></LinkButton>
            </View>
          </View>
        )}
        <View style={styles.containerSwitch}>
          <Image
            style={{
              width: 15,
              height: 15,
              marginTop: 22,
              marginRight: 7,
              tintColor: primaryColor,
            }}
            source={sun_icon}></Image>
          <Switch
            trackColor={{false: primaryColor, true: primaryColor}}
            thumbColor={primaryColor}
            value={isEnabled}
            onValueChange={toggleSwitch}
            style={{marginTop: 20}}
            {...{activeThumbColor: secondaryColor}}
          />
          <Image
            style={{
              width: 15,
              height: 15,
              marginTop: 22,
              marginLeft: 7,
              tintColor: primaryColor,
            }}
            source={mooon_icon}></Image>
        </View>
      </Animated.View>
    );
  },
);

export default PhoneMenu;
