import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinkButton from '../link-button-component/link-button-component';
import MenuButton from '../menu-button-component/menu-button-component';

interface MenuProps {
  onMenuButtonPress: (data: string) => void;
}

interface MenuRef {
  setActiveButtonOnScroll: (activeSection:string) => void;
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  containerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginRight: 140,
    flexDirection: 'row',
  },
  containerLeft: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 150,
    flexDirection: 'row',
    marginTop: 50,
  },
});

// const Menu: React.FC<MenuProps> = ({onMenuButtonPress,}) => {
const Menu = forwardRef<MenuRef, MenuProps>(({onMenuButtonPress}, ref) => {
  useImperativeHandle(ref, () => ({
    setActiveButtonOnScroll(activeSection) {
      setactiveButton(activeSection)
    },
  }));

  const [activeButton, setactiveButton] = useState('home');

  const handleButtonPress = (section: string) => {
    onMenuButtonPress(section);
  };

  return (
    <Animated.View
      style={[styles.mainContainer, {borderWidth: 1, height: 100}]}>
      <View style={[styles.containerLeft]}>
        <LinkButton icon="insta" link="https://www.instagram.com/"></LinkButton>
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
          text="Lets Get In Touch"
          scrollToSection="contact"
          onMenuButtonPress={handleButtonPress}
          isActive={activeButton == 'contact'}></MenuButton>
      </View>
    </Animated.View>
  );
});

export default Menu;
