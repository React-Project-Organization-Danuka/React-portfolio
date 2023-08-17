import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from 'react';
import { Animated, Image, StyleSheet, Switch, View } from 'react-native';
import mooon_icon from '../../assets/icons/moon.svg';
import sun_icon from '../../assets/icons/sun.svg';
import LinkButton from '../link-button-component/link-button-component';
import MenuButton from '../menu-button-component/menu-button-component';
import { ThemeContext } from '../theme-manager-component/theme-provider-component';

interface MenuProps {
  onMenuButtonPress: (data: string) => void;
  onThemeChange: (data: boolean) => void;
}

interface MenuRef {
  setActiveButtonOnScroll: (activeSection: string) => void;
}

// const Menu: React.FC<MenuProps> = ({onMenuButtonPress,}) => {
const Menu = forwardRef<MenuRef, MenuProps>(
  ({onMenuButtonPress, onThemeChange}, ref) => {
    useImperativeHandle(ref, () => ({
      setActiveButtonOnScroll(activeSection) {
        setactiveButton(activeSection);
      },
    }));

    const [activeButton, setactiveButton] = useState('home');

    const handleButtonPress = (section: string) => {
      onMenuButtonPress(section);
    };

    const {primaryColor, secondaryColor, setPrimaryColor, setSecondaryColor} =
      useContext(ThemeContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      if (isEnabled) {
        setPrimaryColor('white');
        setSecondaryColor('black');
      } else {
        setPrimaryColor('black');
        setSecondaryColor('white');
      }
      onThemeChange(isEnabled);
    };

    const styles = StyleSheet.create({
      mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
        backgroundColor: primaryColor,
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
    });

    return (
      <Animated.View
        style={[
          styles.mainContainer,
          {borderWidth: 1, height: 50, borderBottomColor: secondaryColor},
        ]}>
        <View style={[styles.containerLeft]}>
          <LinkButton
            icon="cv"
            link="https://drive.google.com/file/d/1_QOMpt8rO0mmeiaHEsunTQ9EhJJZk26P/view?usp=sharing"></LinkButton>
          <LinkButton
            icon="insta"
            link="https://www.instagram.com/"></LinkButton>
          <LinkButton
            icon="github"
            link="https://github.com/Thaveesha222"></LinkButton>
          <LinkButton
            icon="linkedin"
            link="https://www.linkedin.com/in/danukathaveesha-72aa431a4/"></LinkButton>
        </View>
        <View style={styles.containerRight}>
          <MenuButton
            text="Home"
            scrollToSection="home"
            onMenuButtonPress={handleButtonPress}
            isActive={activeButton == 'home'}></MenuButton>
          <MenuButton
            text="About Me"
            scrollToSection="about"
            onMenuButtonPress={handleButtonPress}
            isActive={activeButton == 'about'}></MenuButton>
          <MenuButton
            text="My Work"
            scrollToSection="work"
            onMenuButtonPress={handleButtonPress}
            isActive={activeButton == 'work'}></MenuButton>
          <MenuButton
            text="Get In Touch"
            scrollToSection="contact"
            onMenuButtonPress={handleButtonPress}
            isActive={activeButton == 'contact'}></MenuButton>
        </View>
        <View style={styles.containerSwitch}>
          <Image
            style={{
              width: 15,
              height: 15,
              marginTop: 22,
              marginRight: 7,
              tintColor: secondaryColor,
            }}
            source={sun_icon}></Image>
          <Switch
            trackColor={{false: secondaryColor, true: secondaryColor}}
            thumbColor={secondaryColor}
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
              tintColor: secondaryColor,
            }}
            source={mooon_icon}></Image>
        </View>
      </Animated.View>
    );
  },
);

export default Menu;
