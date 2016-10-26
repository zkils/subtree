
import {
    grey900, grey700, grey600, grey500, grey800, 
    cyanA400, cyan900,
    teal800,
    darkBlack, fullBlack,
    fullWhite,white,
} from '../colors';
import {fade} from '../utils/colorManipulator';
import spacing from '../spacing';


export default  {
  spacing: spacing,
  fontFamily: 'OpenSans-Regular',
  palette: {
      primary1Color: cyanA400,
      primary2Color: cyanA400,      //obigo primary color
      primary3Color: cyanA400,
      accent1Color: cyanA400,
      accent2Color: cyan900,
      accent3Color: teal800,        //obigo second primary color
      textColor: fullWhite,
      text2Color: fullBlack,
      text3Color : grey500,         //disabled text color
      text4Color : grey600,
      secondaryTextColor: fade(darkBlack, 0.54),
      alternateTextColor: fullBlack,
      canvasColor: white,
      border1Color: grey600,
      border2Color: fullWhite,
      border3Color : fullBlack,
      border4Color: grey700,
      bg1Color: fullBlack,
      bg2Color: grey900,
      bg3Color: grey700,
      bg4Color: fullWhite,
      bg5Color : grey800,
      disabledColor: fade(darkBlack, 0.3),
      shadowColor: fullBlack,
  }
};
