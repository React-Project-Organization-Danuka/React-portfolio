import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CarouselCardItem = ({
  index,
  img,
  text,
}: {
  index: number;
  img: any;
  position: number;
  text: string;
}) => {
  const styles = StyleSheet.create({
    image: {
      width: index == 1 ? 300 : 250,
      height: index == 1 ? 200 : 150,
      alignSelf: 'center',
      marginTop: 30,
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

  return (
    <View key={index}>
      <Image source={img} style={styles.image} />
      <Text style={styles.header}>{text}</Text>
      <Text style={styles.body}></Text>
    </View>
  );
};

export default CarouselCardItem;
