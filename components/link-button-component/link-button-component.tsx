import React, {useState} from 'react';
import {Image, Linking, Pressable, StyleSheet, Animated} from 'react-native';
import github_icon from '../../assets/icons/github.svg';
import instagram_icon from '../../assets/icons/instagram.svg';
import linkedin_icon from '../../assets/icons/linkedin.svg';

interface LinkButtonProps {
  icon: string;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({icon, link}) => {
  const [value, setValue] = useState(20);
  const animatedValue = new Animated.Value(20);

  const handleMouseEnterInternal = () => {
    Animated.timing(animatedValue, {
      toValue: 25,
      duration: 100,
      useNativeDriver: false, // Set to true for better performance on native platforms
    }).start();
  };

  const handleMouseLeaveInternal = () => {
    Animated.timing(animatedValue, {
      toValue: 20,
      duration: 100,
      useNativeDriver: false, // Set to true for better performance on native platforms
    }).start();
  };

  animatedValue.addListener(animation => {
    setValue(animation.value);
  });

  const styles = StyleSheet.create({
    button: {
      marginLeft: 50,
    },
    text: {
      justify: 'center',
      fontSize: 16, // Center the text horizontally
      textAlign: 'center',
    },
    icon: {
      width: value,
      height: value,
    },
  });

  var image = null;
  if (icon == 'insta') {
    image = instagram_icon;
  } else if (icon == 'github') {
    image = github_icon;
  } else if (icon == 'linkedin') {
    image = linkedin_icon;
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
