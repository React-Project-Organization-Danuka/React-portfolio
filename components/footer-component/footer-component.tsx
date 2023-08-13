import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';

const Footer: React.FC = () => {
  const {primaryColor, secondaryColor} = useContext(ThemeContext);
  //For creating the icon background
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        backgroundColor: secondaryColor,
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderBlockColor: 'black',
      }}>
      <Text style={{color: primaryColor, textAlign: 'center'}}>
        © 2023 Danuka Thaveesha
      </Text>
    </View>
  );
};

export default Footer;
