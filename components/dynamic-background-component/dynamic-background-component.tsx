import React from 'react';
import BackgroundIcon from '../background-icon-component/background-icon-component';
import {View} from 'react-native';


interface DynamicBackgroundProps {
  offset: number
  icons: any
  rows:number
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({offset,icons,rows}) => {
  //For creating the icon background
  const icon_hights: number[] = [];

  for (let i = 0; i < rows; i++) {
    icon_hights.push(offset + i * 100);
  }

  var initial = false;

  var Icons = Array.from({length: 16}, () => {
    initial = !initial;
    return initial ? icons[1] : icons[0];
  });

  return (
    <View style={{position: 'absolute'}}>
      {icon_hights.map(icon_height =>
        Icons.reverse().map((icon, index) => (
          <BackgroundIcon
            top={icon_height}
            left={index * 96}
            key={index}
            imagename={icon}
          />
        )),
      )}
    </View>
  );
};

export default DynamicBackground;
