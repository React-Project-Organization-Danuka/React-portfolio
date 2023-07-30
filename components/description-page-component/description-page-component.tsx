import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import html from '../../assets/icons/devhtml.svg';
import rocketicon from '../../assets/icons/rocket.svg';
import angular_logo from '../../assets/images/angular_logo.png';
import aws_logo from '../../assets/images/aws_logo.png';
import laravel_logo from '../../assets/images/laravel.png';
import php_logo from '../../assets/images/php_logo.png';
import react_logo from '../../assets/images/react_logo.png';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logosContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  technologyLogoImage: {
    width: 200,
    height: 100,
  },
});

const DescriptionPage: React.FC = () => {
  //For creating the icon background

  return (
    <View style={{marginTop: 700}}>
      <DynamicBackground offset={220} icons={[rocketicon, html]} rows={6} />
      <View style={styles.mainContainer}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              lineHeight: 50,
              fontFamily: 'Noto Sans',
            }}>
            Languages I Speak
          </Text>
        </View>
        <View style={styles.logosContainer}>
          <Image
            style={styles.technologyLogoImage}
            source={laravel_logo}></Image>
          <Image style={styles.technologyLogoImage} source={react_logo}></Image>
          <Image
            style={styles.technologyLogoImage}
            source={angular_logo}></Image>
          <Image style={styles.technologyLogoImage} source={php_logo}></Image>
          <Image style={styles.technologyLogoImage} source={aws_logo}></Image>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 50,
            fontFamily: 'Noto Sans',
            textAlign: 'center',
          }}>
          … and much more. I believe that a good developer should not have a
          tech stack and he/she should be able to adapt to any technology
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 60}}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            width: '60%',
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 50,
            shadowColor: '#000', // Shadow color
            shadowOffset: {width: 5, height: 5}, // Shadow offset (width, height)
            shadowOpacity: 0.3, // Shadow opacity (0 to 1)
            shadowRadius: 4, // Shadow radius
          }}>
          <View style={{width: '60%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                lineHeight: 50,
                fontFamily: 'Noto Sans',
                textAlign: 'center',
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
              vital to achieving success when collaborating with teams. While I
              strive for excellence, I embrace mistakes as opportunities for
              growth and actively learn from them to prevent future repetition.
              Celebrating achievements is of paramount importance to me, and I
              thoroughly enjoy sharing these moments of success with my team.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DescriptionPage;
