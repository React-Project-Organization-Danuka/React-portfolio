//@ts-nocheck
import React, {useContext} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';

interface TechnologyLogo {
  imagename: ImageSourcePropType;
  text: string;
  isUpsideDown: boolean;
  experience:string
}

const TechnologyLogo: React.FC<BackgroundIcon> = ({
  imagename,
  text,
  isUpsideDown,
  experience
}) => {
  const {primaryColor, secondaryColor} =
    useContext(ThemeContext);
  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: isUpsideDown ? 'column-reverse' : 'column',
    },
    icon: {
      width: 180,
      height: 100,
      tintColor: secondaryColor,
    },
    infoBox: {
      height: 80,
      width: 220,
      backgroundColor: secondaryColor,
      borderRadius: 12,
      padding: 10,
    },
    triangle: {
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderTopWidth: 10,
      borderTopColor: secondaryColor,
      marginLeft: 90,
      transform: [{rotate: isUpsideDown ? '180deg' : '0deg'}],
    },
    infoText: {
      color: primaryColor,
      fontFamily: 'Noto Sans',
    },
    progressBarOuter: {
      width: '100%',
      height: 5,
      backgroundColor: primaryColor,
      borderRadius: 100,
      opacity: 0.4,
      marginTop: 15,
    },
    progressBarInner: {
      position: 'absolute',
      width: experience,
      height: 5,
      backgroundColor: primaryColor,
      borderRadius: 100,
      marginTop: 15,
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          I believe im a <Text style={{fontWeight: 'bold'}}>{text}</Text>
        </Text>
        <View>
          <View style={styles.progressBarOuter}></View>
          <View style={styles.progressBarInner}></View>
        </View>
      </View>
      <View style={styles.triangle}></View>
      <Pressable style={{alignItems:'center'}}>
        <Image source={imagename} style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default TechnologyLogo;
