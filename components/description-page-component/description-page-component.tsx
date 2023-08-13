import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import html from '../../assets/icons/devhtml.svg';
import rocketicon from '../../assets/icons/rocket.svg';
import angular_logo from '../../assets/images/angular_logo.png';
import aws_logo from '../../assets/images/aws_logo.png';
import laravel_logo from '../../assets/images/laravel.png';
import php_logo from '../../assets/images/php_logo.png';
import react_logo from '../../assets/images/react_logo.png';
import stemless_logo from '../../assets/images/stemless_logo.svg';
import echonlabs_logo from '../../assets/images/echonlabs.svg';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';
import TechnologyLogo from '../technology-logo-component/technology-logo-component';

const DescriptionPage: React.FC = () => {
  //For creating the icon background
  const {primaryColor, secondaryColor, isPhoneScreen} =
    useContext(ThemeContext);

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
    },
    logosContainer: {
      flex: 1,
      flexDirection: !isPhoneScreen ? 'row' : 'column',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 50,
    },
    companiesLogosContainer: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
    },
    technologyLogoImage: {
      width: 200,
      height: 100,
      tintColor: secondaryColor,
    },
    companiesLogosImage: {
      width: 300,
      height: 50,
      tintColor: secondaryColor,
    },
  });

  return (
    <View style={{marginTop: !isPhoneScreen ? 700 : 800}}>
      <DynamicBackground offset={220} icons={[rocketicon, html]} rows={6} />
      <View style={styles.mainContainer}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              lineHeight: 50,
              fontFamily: 'Noto Sans',
              color: secondaryColor,
            }}>
            Languages I Speak
          </Text>
        </View>
        <View style={styles.logosContainer}>
          <TechnologyLogo
            imagename={laravel_logo}
            text="Veteran"
            experience="95%"
            isUpsideDown={isPhoneScreen==true ? true : true}></TechnologyLogo>
          <TechnologyLogo
            imagename={react_logo}
            text="Rookie"
            experience="50%"
            isUpsideDown={isPhoneScreen == true ?  true : false}></TechnologyLogo>
          <TechnologyLogo
            imagename={php_logo}
            text="Maestro"
            experience="90%"
            isUpsideDown={isPhoneScreen==true ? true : true}></TechnologyLogo>
          <TechnologyLogo
            imagename={aws_logo}
            text="Elite"
            experience="75%"
            isUpsideDown={isPhoneScreen == true ?  true : false}></TechnologyLogo>
          <TechnologyLogo
            imagename={angular_logo}
            text="Apprentice"
            experience="60%"
            isUpsideDown={isPhoneScreen==true ? true : true}></TechnologyLogo>
        </View>
      </View>
      {false && (
        <View style={[styles.mainContainer, {marginTop: 100}]}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                lineHeight: 50,
                fontFamily: 'Noto Sans',
                color: secondaryColor,
                marginBottom: 40,
              }}>
              I Am Proud To Have Collaborated With The Following Companies
            </Text>
          </View>
          <View style={styles.companiesLogosContainer}>
            <Image
              style={styles.companiesLogosImage}
              source={stemless_logo}></Image>
            <Image
              style={[styles.companiesLogosImage, {height: 75}]}
              source={echonlabs_logo}></Image>
          </View>
        </View>
      )}
      {!isPhoneScreen && (
        <View style={{alignItems: 'center', marginTop: 60}}>
          <View
            style={{
              backgroundColor: primaryColor,
              alignItems: 'center',
              width: '60%',
              borderColor: secondaryColor,
              borderWidth: 2,
              borderRadius: 10,
              shadowColor: '#000', // Shadow color
              shadowOffset: {width: 5, height: 5}, // Shadow offset (width, height)
              shadowOpacity: 0.3, // Shadow opacity (0 to 1)
              shadowRadius: 4, // Shadow radius
              marginTop:50
            }}>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  lineHeight: 50,
                  fontFamily: 'Noto Sans',
                  textAlign: 'center',
                  color: secondaryColor,
                }}>
                A Bit About Me
              </Text>
            </View>
            <View style={{alignItems: 'center', width: '80%'}}>
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 50,
                  fontFamily: 'Noto Sans',
                  textAlign: 'justify',
                  justifyContent: 'center',
                  color: secondaryColor,
                }}>
                I am an enthusiastic software developer with a strong dedication
                to continuous learning and a passion for exploring cutting-edge
                technologies. Currently, I am actively pursuing a degree program
                in Electronics and Information Technology, further enriching my
                knowledge and honing my skill-set. I thrive in collaborative
                environments and have successfully contributed to small and
                medium-sized teams, comprising diverse members from various
                countries. I excel at quickly grasping new concepts and staying
                abreast of the latest trends and advancements in my field. I am
                highly responsive and believe that effective communication is
                vital to achieving success when collaborating with teams. While
                I strive for excellence, I embrace mistakes as opportunities for
                growth and actively learn from them to prevent future
                repetition.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DescriptionPage;
