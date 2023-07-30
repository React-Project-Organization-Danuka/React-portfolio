import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import braces from '../../assets/icons/braces.svg';
import coffee from '../../assets/icons/cup-hot.svg';
import rocketicon from '../../assets/icons/rocket.svg';
import me from '../../assets/images/me.png';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
import MenuButton from '../menu-button-component/menu-button-component';

const icons = [rocketicon, braces, coffee];

const LandingPage: React.FC = () => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    image: {
      width: 450,
      height: 450,
      },
    icon: {
      width: 30,
      height: 30,
    },
    imageContainer: {
      flex: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 50,
    },
    descriptionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      marginLeft: 200,
      fontFamily: 'Noto Sans',
      marginTop: 300,
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
          <Text style={{fontSize: 20,marginBottom:20}}>Lets Create Wonders Together!</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              lineHeight: 50,
              fontFamily: 'Noto Sans',
            }}>
            I Can Help You Build Your Next Tech Product With The Latest Cutting
            Edge Technology . . .{' '}
            <Image source={icons[count % 3]} style={styles.icon} />
          </Text>
          <View style={{marginTop:27}}>
            <MenuButton
              text="Schedule a Meeting with me!"
              width={250}
              scrollToSection=""
              isCustom={true}></MenuButton>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={me} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

export default LandingPage;
