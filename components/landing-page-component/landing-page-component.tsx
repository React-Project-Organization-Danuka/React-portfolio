import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import braces from '../../assets/icons/braces.svg';
import coffee from '../../assets/icons/cup-hot.svg';
import rocketicon from '../../assets/icons/rocket.svg';
import me_white from '../../assets/images/me_white.jpg';
import me_black from '../../assets/images/me.png';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
import Button from '../button-component/button-component';
import {
  ThemeContext,
} from '../theme-manager-component/theme-provider-component';

const icons = [rocketicon, braces, coffee];

const LandingPage: React.FC = () => {
  const {primaryColor, secondaryColor, isPhoneScreen} =
    useContext(ThemeContext);

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: isPhoneScreen ? 'column' : 'row',
      marginTop : !isPhoneScreen ? 0 : 120,
      justifyContent:'space-between'
    },
    image: {
      width: isPhoneScreen ? 300 : 400,
      height: isPhoneScreen ? 300 : 400,
      borderRadius: 70,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: secondaryColor,
    },
    imageContainer: {
      flex: isPhoneScreen ? 1 : 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: isPhoneScreen ? 200 : 100,
    },
    descriptionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      marginLeft: !isPhoneScreen ? 200 : 0,
      padding: !isPhoneScreen ? 0 : 30,
      marginTop: !isPhoneScreen ? 300 : 20,
    },
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalTime = 1000;
    const incrementCounter = () => {
      setCount(prevCount => prevCount + 1);
    };
    const intervalId = setInterval(incrementCounter, intervalTime);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{flex: 1}}>
      <DynamicBackground offset={20} icons={[rocketicon, braces]} rows={9} />
      <View style={styles.mainContainer}>
        <View style={styles.descriptionContainer}>
          <View style={{backgroundColor: primaryColor, borderRadius: 200}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: !isPhoneScreen ? 60 : 40,
                // fontFamily: 'Roboto ',
                color: secondaryColor,
                marginBottom: !isPhoneScreen ? 40 : 0,
                width: '100%',
                textAlign:
                  !isPhoneScreen ? 'auto' : 'center',
              }}>
              Backend Developer
            </Text>
          </View>
          <View style={{backgroundColor: primaryColor}}>
            <Text
              style={{
                // fontFamily: 'Roboto',
                fontSize: !isPhoneScreen ? 18 : 15,
                marginBottom: !isPhoneScreen ? 20 : 0,
                color: secondaryColor,
                lineHeight: 40,
                fontWeight: '500',
                textAlign:
                  !isPhoneScreen ? 'auto' : 'center',
              }}>
              I Can Help You Build Your Next Tech Product With The Latest
              Cutting Edge Technology . . .{' '}
              <Image source={icons[count % 3]} style={styles.icon} />
            </Text>
          </View>
          <View
            style={{
              backgroundColor: primaryColor,
              borderRadius: 200,
              alignItems: isPhoneScreen ? 'center' : 'baseline',
            }}>
            <View
              style={{marginTop: !isPhoneScreen ? 27 : 0}}>
              <Button
                text="Schedule a Meeting with me!"
                width={250}
                scrollToSection="contact"
                isCustom={true}></Button>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={secondaryColor == 'white' ? me_white : me_black}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default LandingPage;
