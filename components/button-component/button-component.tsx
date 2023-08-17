import React, {useContext, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';

interface MenuButtonProps {
  text: string;
  scrollToSection: string;
  width?: number;
  isCustom?: boolean;
  isActive?: boolean;
  onMenuButtonPress?: (data: string) => void;
}

const Button: React.FC<MenuButtonProps> = ({
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
  const {primaryColor, secondaryColor} = useContext(ThemeContext);

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
      backgroundColor: isHovered || isActive ? secondaryColor : 'transparent', // Change the background color based on isHovered state
      padding: isCustom ? 10 :  3,
      margin: isCustom ? 0 : 15,
      marginTop:12,
      fontFamily: 'Noto Sans',
      borderColor: secondaryColor,
      borderRadius: 15,
      borderWidth: 3,
      borderBlockColor:'grey',
      borderStartColor:'grey',
      borderEndColor:'grey',
      width: width ?? 135,
      opacity: !isHovered ? 1 : value,
    },
    text: {
      color: isHovered || isActive ? primaryColor : secondaryColor,
      justify: 'center',
      fontSize: isCustom ? 15 : 13, // Center the text horizontally
      textAlign: 'center',
      textTransform : isCustom ? 'none' : 'uppercase'
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

export default Button;
