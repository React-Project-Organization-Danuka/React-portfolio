import React, {useState} from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';

interface MenuButtonProps {
  text: string;
  scrollToSection: string;
  width?: number;
  isCustom?: boolean;
  isActive?: boolean;
  onMenuButtonPress?: (data: string) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  text,
  scrollToSection,
  width,
  isCustom,
  isActive,
  onMenuButtonPress,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(0);
  const animatedValue = new Animated.Value(0);

  const handleMouseEnterInternal = () => {
    if (!isActive) {
      setIsHovered(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMouseLeaveInternal = () => {
    setIsHovered(false);
  };

  animatedValue.addListener(animation => {
    setValue(animation.value);
  });

  // const scrollViewRef = useRef(null);
  // Add more refs for other sections if needed

  const handleScrollToSection = (ref: string) => {
    if (onMenuButtonPress) {
      onMenuButtonPress(ref); // Trigger the custom event with the data
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: isHovered || isActive ? 'black' : 'transparent', // Change the background color based on isHovered state
      padding: 10,
      margin: isCustom ? 0 : 10,
      fontFamily: 'Noto Sans',
      borderColor: 'black',
      borderRadius: 100,
      borderWidth: 3,
      width: width ?? 150,
      opacity: !isHovered ? 1 : value,
    },
    text: {
      color: isHovered || isActive ? 'white' : 'black',
      justify: 'center',
      fontSize: 16, // Center the text horizontally
      textAlign: 'center',
    },
  });

  return (
    <Pressable
      style={styles.button}
      onPress={() => handleScrollToSection(scrollToSection)}
      onHoverIn={handleMouseEnterInternal}
      onHoverOut={handleMouseLeaveInternal}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default MenuButton;
