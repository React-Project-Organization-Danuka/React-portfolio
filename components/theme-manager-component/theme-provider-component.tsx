import React, {createContext, useState, useEffect} from 'react';

interface ThemeContextProps {
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  isPhoneScreen: boolean;
}

const Color1 = 'white';
const Color2 = 'black';

const ThemeContext = createContext<ThemeContextProps>({
  primaryColor: Color1,
  secondaryColor: Color2,
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  isPhoneScreen: false,
});

const ThemeContextProvider: React.FC = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [primaryColor, setPrimaryColor] = useState(Color1);
  const [secondaryColor, setSecondaryColor] = useState(Color2);
  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsPhoneScreen(window.innerWidth < 1000);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        secondaryColor,
        setPrimaryColor,
        setSecondaryColor,
        isPhoneScreen,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeContextProvider};
