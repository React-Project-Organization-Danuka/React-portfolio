// @ts-nocheck
import React, {useContext, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import cofee from '../../assets/icons/cup-hot.svg';
import rocket from '../../assets/icons/rocket.svg';
import rightarrow from '../../assets/icons/right_arrow.svg';
import project_1 from '../../assets/images/project_1.png';
import project_2 from '../../assets/images/project_2.png';
import project_3 from '../../assets/images/project_3.png';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
import {ThemeContext} from '../theme-manager-component/theme-provider-component';
import descriptions from '../../assets/descriptions.json'


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH_INACTIVE = 300;
export const ITEM_WIDTH = 350;
export const ITEM_HEIGHT_INACTIVE = 300;
export const ITEM_HEIGHT = 400;

const componentData = [
  {
    props: {
      img: project_1,
      text: 'API for GetSafe School/Office Transport Management System',
      description:descriptions[0]['my-work']['get_safe'],
    },
  },
  {
    props: {
      img: project_2,
      text: 'Web Application for Displaying Analytics of a Smart Plug',
      description:descriptions[0]['my-work']['smart_plug'],
    },
  },
  {
    props: {
      img: project_3,
      text: 'GPA calculator and predictor web application',
      description:descriptions[0]['my-work']['gpa_predictor'],
    },
  },
];

const MyWorkPagePhone: React.FC = () => {
  const {primaryColor, secondaryColor} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: primaryColor,
      alignItems: 'center',
      width: '100%',
    },
    header: {
      color: '#222',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingTop: 20,
      textAlign: 'center',
      color: secondaryColor,
    },
    body: {
      color: '#222',
      fontSize: 18,
      textAlign: 'center',
      color: secondaryColor,
      marginTop: 20,
    },
  });

  const [myArray, setMyArray] = useState(componentData);
  const mainAnimation = new Animated.Value(0);
  const mainAnimationBackward = new Animated.Value(0);
  const [leftValue, setLeftValue] = useState(0);
  const [opacityValue, setOpacityValue] = useState(0);

  const moveForward = () => {
    setMyArray(prevArray => {
      // Create a new array with the elements moved forward by one position
      const newArray = [...prevArray];
      const lastItem = newArray.pop();
      if (lastItem) {
        newArray.unshift(lastItem);
      }
      return newArray;
    });
    Animated.timing(mainAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const moveBackward = () => {
    setMyArray(prevArray => {
      const [first, second, ...rest] = prevArray; // Destructure the first two elements
      return [second, first, ...rest]; // Swap and reassemble the array
    });
    Animated.timing(mainAnimationBackward, {
      toValue: -1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  mainAnimation.addListener(animation => {
    setLeftValue(animation.value * 300);
    setOpacityValue(1 - animation.value);
  });

  mainAnimationBackward.addListener(animation => {
    setLeftValue(animation.value * 350);
    setOpacityValue(1 - Math.abs(animation.value));
  });

  const animatedValue = new Animated.Value(0);
  const [value, setValue] = useState(0);

  const handleMouseEnterInternal = (index: number) => {
    if (value == 300) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMouseLeaveInternal = (index: number) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  animatedValue.addListener(animation => {
    setValue(animation.value * 300);
  });

  return (
    <View style={{height: '60%', backgroundColor: 'transparent'}}>
      <DynamicBackground offset={0} icons={[rocket, cofee]} rows={8} />
      <View
        style={{
          marginTop: 150,
          justifyContent: 'center',
          alignItems: 'center',
          height: '60%',
          backgroundColor: 'transparent',
        }}>
        <View style={{height: '30%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              fontFamily: 'Noto Sans',
              textAlign: 'center',
              color: secondaryColor,
            }}>
            My Work
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Pressable onPress={moveBackward}>
            <Image
              source={rightarrow}
              style={{
                width: 20,
                height: 20,
                transform: [{rotate: '180deg'}],
                marginLeft: 20,
                tintColor: secondaryColor,
              }}></Image>
          </Pressable>
          {myArray.slice(0, 2).map((item, index) => {
            const props = item.props;
            return (
              <Pressable
                onPress={handleMouseEnterInternal}
                onBlur={handleMouseLeaveInternal}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: index == 0 ? 'relative' : 'absolute',
                  opacity: index == 0 ? 1 - opacityValue : opacityValue,
                }}>
                <Animated.View
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: 15,
                    paddingBottom: 40,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    width: ITEM_WIDTH_INACTIVE,
                    height: ITEM_HEIGHT_INACTIVE,
                    borderWidth: 3,
                    borderColor: secondaryColor,
                    left: index == 1 ? leftValue : 0,
                  }}>
                  <View key={index}>
                    {index == 0 && (
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: secondaryColor,
                          borderRadius: 15,
                          paddingBottom: 40,
                          shadowColor: '#000',
                          width: value,
                          height: ITEM_HEIGHT_INACTIVE,
                          zIndex: 1000000000,
                          position: 'absolute',
                        }}>
                        {value > 100 && (
                          <Text style={{color: primaryColor, padding: 40}}>
                            {props.description}
                          </Text>
                        )}
                      </View>
                    )}
                    <Image
                      source={props.img}
                      style={{
                        width: 200,
                        height: 120,
                        alignSelf: 'center',
                        marginTop: 30,
                      }}
                    />
                    <Text style={styles.header}>{props.text}</Text>
                    <Text style={styles.body}>(Tap for more info)</Text>
                  </View>
                </Animated.View>
              </Pressable>
            );
          })}
          <Pressable onPress={moveForward}>
            <Image
              source={rightarrow}
              style={{
                width: 20,
                height: 20,
                marginRight: 20,
                tintColor: secondaryColor,
              }}></Image>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyWorkPagePhone;
