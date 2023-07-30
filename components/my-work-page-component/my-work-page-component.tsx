import React, {useState} from 'react';
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
import project_1 from '../../assets/images/project_1.png';
import project_2 from '../../assets/images/project_2.png';
import project_3 from '../../assets/images/project_3.png';
import CarouselCardItem from '../carousel-card-component/carousel-card-component';
import DynamicBackground from '../dynamic-background-component/dynamic-background-component';
// import rightArrow from '../../assets/icons/right_arrow.svg';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH_INACTIVE = 300;
export const ITEM_WIDTH = 350;
export const ITEM_HEIGHT_INACTIVE = 300;
export const ITEM_HEIGHT = 400;
export const IMAGE_HEIGHT_ACTIVE = 300;
export const IMAGE_HEIGHT_INACTIVE = 250;
export const IMAGE_WIDTH_ACTIVE = 200;
export const IMAGE_WIDTH_INACTIVE = 150;

const componentData = [
  {
    component: CarouselCardItem,
    props: {
      img: project_1,
      text: 'API for GetSafe School/Office Transport Management System',
    },
  },
  {
    component: CarouselCardItem,
    props: {img: project_2, text: 'Web Application for Smart Plug'},
  },
  {
    component: CarouselCardItem,
    props: {
      img: project_3,
      text: 'GPA calculator and predictor web application',
    },
  },
];

const MyWorkPage: React.FC = () => {
  const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
      width: '80%',
    },
    header: {
      color: '#222',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingTop: 20,
      alignSelf: 'center',
    },
    body: {
      color: '#222',
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20,
    },
  });

  const [myArray, setMyArray] = useState(componentData);

  const [animatedLeftMargin, setanimatedLeftMargin] = useState(0);

  const [opacityIndex1Value, setopacityIndex1Value] = useState(0.5);
  const [opacityIndex2Value, setopacityIndex2Value] = useState(1);
  const [opacityIndex3Value, setopacityIndex3Value] = useState(0.5);

  const [hightInActiveValue, sethightInActiveValue] =
    useState(ITEM_HEIGHT_INACTIVE);
  const [widthInActiveValue, setwidthInActiveValue] =
    useState(ITEM_WIDTH_INACTIVE);

  const [hightActiveValue, sethightActiveValue] = useState(ITEM_HEIGHT);
  const [widthActiveValue, setwidthActiveValue] = useState(ITEM_WIDTH);

  const [imageHightInActiveValue, setImageHightInActiveValue] = useState(
    IMAGE_HEIGHT_INACTIVE,
  );
  const [imageWidthInActiveValue, setImageWidthInActiveValue] =
    useState(IMAGE_WIDTH_INACTIVE);

  const [imageHightActiveValue, setImageHightActiveValue] =
    useState(IMAGE_HEIGHT_ACTIVE);
  const [imageWidthActiveValue, setImageWidthActiveValue] =
    useState(IMAGE_WIDTH_ACTIVE);

  const mainAnimation = new Animated.Value(0);

  const moveForward = () => {
    Animated.timing(mainAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setMyArray(prevArray => {
        // Create a new array with the elements moved forward by one position
        const newArray = [...prevArray];
        const lastItem = newArray.pop();
        if (lastItem) {
          newArray.unshift(lastItem);
        }
        setanimatedLeftMargin(0);
        setopacityIndex1Value(0.5);
        setopacityIndex2Value(1);
        setopacityIndex3Value(0.5);

        sethightActiveValue(ITEM_HEIGHT);
        sethightInActiveValue(ITEM_HEIGHT_INACTIVE);
        setwidthActiveValue(ITEM_WIDTH);
        setwidthInActiveValue(ITEM_WIDTH_INACTIVE);

        setImageHightActiveValue(IMAGE_HEIGHT_ACTIVE);
        setImageHightInActiveValue(IMAGE_HEIGHT_INACTIVE);
        setImageWidthActiveValue(IMAGE_WIDTH_ACTIVE);
        setImageWidthInActiveValue(IMAGE_WIDTH_INACTIVE);

        return newArray;
      });
    });
  };

  function linearInterpolation(
    x: number,
    x0: number,
    x1: number,
    y0: number,
    y1: number,
  ): number {
    const y = y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    return y;
  }

  mainAnimation.addListener(animation => {
    //Moving component to left
    setanimatedLeftMargin(linearInterpolation(animation.value, 0, 1, 0, 340));

    //Changing opacity of components
    setopacityIndex1Value(linearInterpolation(animation.value, 0, 1, 0.5, 1));
    setopacityIndex2Value(linearInterpolation(animation.value, 0, 1, 1, 0.5));
    setopacityIndex3Value(linearInterpolation(animation.value, 0, 1, 0.25, 0));

    //Changing width and height of components
    sethightActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        ITEM_HEIGHT,
        ITEM_HEIGHT_INACTIVE,
      ),
    );
    sethightInActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        ITEM_HEIGHT_INACTIVE,
        ITEM_HEIGHT,
      ),
    );

    setwidthActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        ITEM_WIDTH,
        ITEM_WIDTH_INACTIVE,
      ),
    );
    setwidthInActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        ITEM_WIDTH_INACTIVE,
        ITEM_WIDTH,
      ),
    );

    setImageHightActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        IMAGE_HEIGHT_ACTIVE,
        IMAGE_HEIGHT_INACTIVE,
      ),
    );
    setImageWidthActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        IMAGE_WIDTH_ACTIVE,
        IMAGE_WIDTH_INACTIVE,
      ),
    );

    setImageHightInActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        IMAGE_HEIGHT_INACTIVE,
        IMAGE_HEIGHT_ACTIVE,
      ),
    );
    setImageWidthInActiveValue(
      linearInterpolation(
        animation.value,
        0,
        1,
        IMAGE_WIDTH_INACTIVE,
        IMAGE_WIDTH_ACTIVE,
      ),
    );
  });

  return (
    <View style={{height: '60%'}}>
      <DynamicBackground offset={0} icons={[rocket, cofee]} rows={8} />
      <View
        style={{
          marginTop: 150,
          justifyContent: 'center',
          alignItems: 'center',
          height: '60%',
        }}>
        <View style={{height: '30%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              // lineHeight: 50,
              fontFamily: 'Noto Sans',
              textAlign: 'center',
            }}>
            My Work
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Pressable onPress={moveForward}>
            <Text style={{fontSize: 30, paddingRight: 10, fontWeight: '900'}}>
              {'<'}
            </Text>
          </Pressable>
          {myArray.slice(0, 3).map((item, index) => {
            const props = item.props;
            return (
              <Animated.View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  paddingBottom: 40,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7,
                  marginLeft: index == 2 ? 50 : 0,
                  marginRight: index == 0 ? 50 : 0,

                  left: index == 1 || index == 0 ? animatedLeftMargin : 0,
                  width:
                    index == 1
                      ? widthActiveValue
                      : index == 0
                      ? widthInActiveValue
                      : ITEM_WIDTH_INACTIVE,
                  height:
                    index == 1
                      ? hightActiveValue
                      : index == 0
                      ? hightInActiveValue
                      : ITEM_WIDTH_INACTIVE,
                  borderWidth: index == 1 ? 3 : 1,
                  opacity:
                    index == 0
                      ? opacityIndex1Value
                      : index == 1
                      ? opacityIndex2Value
                      : opacityIndex3Value,
                }}>
                <View key={index}>
                  <Image
                    source={props.img}
                    style={{
                      width:
                        index == 1
                          ? imageHightActiveValue
                          : imageHightInActiveValue,
                      height:
                        index == 1
                          ? imageWidthActiveValue
                          : imageWidthInActiveValue,
                      alignSelf: 'center',
                      marginTop: 30,
                    }}
                  />
                  <Text style={styles.header}>{props.text}</Text>
                  <Text style={styles.body}></Text>
                </View>
              </Animated.View>
            );
          })}
          <Pressable onPress={moveForward}>
            <Text style={{fontSize: 30, paddingLeft: 10, fontWeight: '900'}}>
              {'>'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyWorkPage;
