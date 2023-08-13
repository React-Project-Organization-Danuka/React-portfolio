// @ts-nocheck

import React, { useContext } from 'react';
import {Text, View, StyleSheet, TextInput, Image} from 'react-native';
import html from '../../assets/icons/devhtml.svg';
import rocketicon from '../../assets/icons/rocket.svg';
import phoneicon from '../../assets/icons/phone.svg';
import email from '../../assets/icons/email.svg';
import location from '../../assets/icons/location.svg';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
import MenuButton from '../menu-button-component/menu-button-component';
import { ThemeContext } from '../theme-manager-component/theme-provider-component';
import Button from '../button-component/button-component';



const ContactPage: React.FC = () => {
  //For creating the icon background
  const {primaryColor,secondaryColor} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: primaryColor,
      alignItems: 'center',
      width: '60%',
      borderColor: secondaryColor,
      borderWidth: 2,
      borderRadius: 15,
      shadowColor: '#000', // Shadow color
      shadowOffset: {width: 5, height: 5}, // Shadow offset (width, height)
      shadowOpacity: 0.3, // Shadow opacity (0 to 1)
      shadowRadius: 4, // Shadow radius
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 50,
      fontFamily: 'Noto Sans',
      textAlign: 'center',
      color:secondaryColor
    },
    subContainer: {
      alignItems: 'center',
      width: '100%',
      flex: 1,
      flexDirection: 'row',
    },
    topContainer: {
      width: '70%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomContainer: {
      backgroundColor: secondaryColor,
      height: '100%',
      width: '30%',
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
    },
    textField: {
      borderColor: secondaryColor,
      borderWidth: 2,
      borderRadius: 100,
      width: '75%',
      height: 30,
      marginLeft: 20,
      padding: 15,
      color:secondaryColor
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    bottomContainerComponent: {
      marginLeft: 30,
    },
    bottomContainerText: {
      color: primaryColor,
    },
    bottomContainerIcon: {
      tintColor: primaryColor,
      width: 20,
      height: 20,
      marginBottom:10,
    },
  });

  return (
    <View style={{marginTop: 210}}>
      <DynamicBackground offset={220} icons={[rocketicon, html]} rows={6} />
      <View style={{alignItems: 'center', marginTop: 60}}>
        <View style={[styles.mainContainer]}>
          <View style={styles.subContainer}>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerComponent}>
                <Image
                  source={phoneicon}
                  style={styles.bottomContainerIcon}></Image>
                <Text style={styles.bottomContainerText}>+94 76 272 5395</Text>
              </View>
              <View style={styles.bottomContainerComponent}>
                <Image
                  source={email}
                  style={styles.bottomContainerIcon}></Image>
                <Text style={styles.bottomContainerText}>
                  thaveesha222@gmail.com
                </Text>
                <Text style={styles.bottomContainerText}>
                  danukawaidyatillake@gmail.com
                </Text>
              </View>
              <View style={styles.bottomContainerComponent}>
                <Image
                  source={location}
                  style={styles.bottomContainerIcon}></Image>
                <Text style={styles.bottomContainerText}>
                  253/A{'\n'}Pahala Karagahamuna{'\n'}Kadawatha{'\n'}Sri
                  Lanka
                </Text>
              </View>
            </View>
            <View style={styles.topContainer}>
              <View style={{width: '60%'}}>
                <Text style={styles.heading}>Lets Get In Touch !</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{color:secondaryColor}}>Name</Text>
                <TextInput editable style={styles.textField} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{color:secondaryColor}}>Email</Text>
                <TextInput editable style={styles.textField} />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{color:secondaryColor}}>Body</Text>
                <TextInput
                  editable
                  style={[
                    styles.textField,
                    [{height: 'auto', borderRadius: 30}],
                  ]}
                  multiline
                  numberOfLines={7}
                />
              </View>
              <View style={{marginBottom: 20}}>
                <Button
                  text="Reach out to me!"
                  width={250}
                  scrollToSection=""
                  isCustom={true}></Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactPage;
