//@ts-nocheck
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

const PhoneMenuButton: React.FC<MenuButtonProps> = ({
  text,
  scrollToSection,
  isActive,
  isCustom,
  onMenuButtonPress,
}) => {
  const [value, setValue] = useState(DEACTIVE_BUTTON_TEXT_SIZE);
  const [underlineValue, setUnderlineValue] = useState(0);
  const animatedValue = new Animated.Value(0);
  const {primaryColor, secondaryColor} = useContext(ThemeContext);
  const [textWidth, setTextWidth] = useState(0);

  const handleTextLayout = (event: any) => {
    const {width} = event.nativeEvent.layout;
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
      width: 250,
      height: 50,
      backgroundColor: isActive ? primaryColor : secondaryColor,
      justifyContent:'center',
      borderTopRightRadius : isCustom ? 6 : 0
    },
    text: {
      color: isActive ? secondaryColor : primaryColor,
      justify: 'center',
      fontSize: value, // Center the text horizontally
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'Noto Sans',
      fontWeight: '700',
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
      <View style={{backgroundColor: secondaryColor}} />
    </Pressable>
  );
};

export default PhoneMenuButton;
