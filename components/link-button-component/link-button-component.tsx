import React, {useContext, useState} from 'react';
import {Animated, Image, Linking, Pressable, StyleSheet} from 'react-native';
import github_icon from '../../assets/icons/github.svg';
import instagram_icon from '../../assets/icons/instagram.svg';
import linkedin_icon from '../../assets/icons/linkedin.svg';
import cv_icon from '../../assets/icons/cv.svg';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';

interface LinkButtonProps {
  icon: string;
  link: string;
  isPhoneMenu?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({icon, link, isPhoneMenu}) => {
  const [value, setValue] = useState(isPhoneMenu ? 15 : 20);
  const animatedValue = new Animated.Value(isPhoneMenu ? 15 : 20);
  const {primaryColor, secondaryColor} = useContext(ThemeContext);

  const handleMouseEnterInternal = () => {
    Animated.timing(animatedValue, {
      toValue: isPhoneMenu ? 20 : 25,
      duration: 100,
      useNativeDriver: false, // Set to true for better performance on native platforms
    }).start();
  };

  const handleMouseLeaveInternal = () => {
    Animated.timing(animatedValue, {
      toValue: isPhoneMenu ? 15 : 20,
      duration: 100,
      useNativeDriver: false, // Set to true for better performance on native platforms
    }).start();
  };

  animatedValue.addListener(animation => {
    setValue(animation.value);
  });

  const styles = StyleSheet.create({
    button: {
      marginLeft: isPhoneMenu ? 0 : 30,
      width: 25,
    },
    text: {
      justify: 'center',
      fontSize: isPhoneMenu ? 12 : 16, // Center the text horizontally
      textAlign: 'center',
    },
    icon: {
      width: value,
      height: value,
      tintColor: isPhoneMenu ? primaryColor : secondaryColor,
    },
  });

  var image = null;
  if (icon == 'insta') {
    image = instagram_icon;
  } else if (icon == 'github') {
    image = github_icon;
  } else if (icon == 'linkedin') {
    image = linkedin_icon;
  } else if (icon == 'cv') {
    image = cv_icon;
  } else {
    image = instagram_icon;
  }

  return (
    <Pressable
      onPressIn={() => {
        Linking.canOpenURL(link)
          .then(supported => {
            if (supported) {
              return Linking.openURL(link);
            } else {
              console.log('Cannot open URL:', link);
            }
          })
          .catch(error => console.error('Error opening URL:', error));
        return null;
      }}
      style={styles.button}
      onHoverIn={handleMouseEnterInternal}
      onHoverOut={handleMouseLeaveInternal}>
      <Image style={styles.icon} source={image}></Image>
    </Pressable>
  );
};

export default LinkButton;
