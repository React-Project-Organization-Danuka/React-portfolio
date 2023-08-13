import React, {useContext, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';

interface MenuButtonProps {
  text: string;
  scrollToSection: string;
  width?: number;
  isCustom?: boolean;
  isActive?: boolean;
  onMenuButtonPress?: (data: string) => void;
}

const ACTIVE_BUTTON_TEXT_SIZE = 19;
const DEACTIVE_BUTTON_TEXT_SIZE = 12;

const MenuButton: React.FC<MenuButtonProps> = ({
  text,
  scrollToSection,
  isActive,
  onMenuButtonPress,
}) => {
  const [value, setValue] = useState(DEACTIVE_BUTTON_TEXT_SIZE);
  const [underlineValue, setUnderlineValue] = useState(0);
  const animatedValue = new Animated.Value(0);
  const {secondaryColor} = useContext(ThemeContext);
  const [textWidth, setTextWidth] = useState(0);

  const handleTextLayout = (event:any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

  const handleMouseEnterInternal = () => {
    if (!isActive) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleMouseLeaveInternal = () => {
    if (!isActive) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  animatedValue.addListener(animation => {
    setValue(
      animation.value * ACTIVE_BUTTON_TEXT_SIZE +
        (1 - animation.value) * DEACTIVE_BUTTON_TEXT_SIZE,
    );
    setUnderlineValue(animation.value * textWidth);
  });


  const handleScrollToSection = (ref: string) => {
    if (onMenuButtonPress) {
      onMenuButtonPress(ref);
    }
  };

  const styles = StyleSheet.create({
    button: {
      // backgroundColor: 'transparent', // Change the background color based on isHovered state
      padding: 3,
      margin: 15,
      marginTop: 12,
      width: 150,
      position: 'relative',
    },
    text: {
      color: secondaryColor,
      justify: 'center',
      fontSize: isActive ? ACTIVE_BUTTON_TEXT_SIZE : value, // Center the text horizontally
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'Noto Sans',
      fontWeight: '700',
      marginTop: isActive ? 0 : 2,
    },
    underline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      width: isActive ? textWidth : underlineValue, // Set the height of the underline as you desire
      // You can adjust other styles of the underline (e.g., padding, margin, etc.) here
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={() => handleScrollToSection(scrollToSection)}
      onHoverIn={handleMouseEnterInternal}
      onHoverOut={handleMouseLeaveInternal}>
      <Text onLayout={handleTextLayout} style={styles.text}>
        {text}
      </Text>
      <View style={[styles.underline, {backgroundColor: secondaryColor}]} />
    </Pressable>
  );
};

export default MenuButton;
