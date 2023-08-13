//@ts-nocheck
import React, { useContext, useState } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../theme-manager-component/theme-provider-component';

interface BackgroundIcon {
  imagename: ImageSourcePropType;
  top: number;
  left: number;
  key: any;
}

const BackgroundIcon: React.FC<BackgroundIcon> = ({
  imagename,
  top,
  left,
  key,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(20);
  const [rotation, setRotation] = useState(0);

  const animatedValue = new Animated.Value(20);
  const rotationValue = new Animated.Value(0);
  const {secondaryColor} = useContext(ThemeContext);


  const handleMouseEnterInternal = () => {
    setIsHovered(true);
    Animated.timing(animatedValue, {
      toValue: 25,
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotationValue, {
      toValue: 360,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const handleMouseLeaveInternal = () => {
    setIsHovered(false);
    Animated.timing(animatedValue, {
      toValue: 20,
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotationValue, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  animatedValue.addListener(animation => {
    setValue(animation.value);
  });

  rotationValue.addListener(animation => {
    setRotation(animation.value);
  });

  const styles = StyleSheet.create({
    icon: {
      position: 'absolute',
      top: top,
      left: left,
      height: value,
      width: value,
      opacity: isHovered ? 1 : 0.2,
      marginLeft: 20,
      transform: [{rotate: rotation + 'deg'}],
      tintColor:secondaryColor
    },
  });

  return (
    <Pressable
      onHoverIn={handleMouseEnterInternal}
      onHoverOut={handleMouseLeaveInternal}>
      <Image key={key} source={imagename} style={styles.icon} />
    </Pressable>
  );
};

export default BackgroundIcon;
