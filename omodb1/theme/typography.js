
import {
    fullBlack,
    darkBlack,
    lightBlack,
    minBlack,
    fullWhite,
    darkWhite,
    lightWhite,
} from './colors';

class Typography {

  constructor() {
    // text colors
    this.textFullBlack = fullBlack;
    this.textDarkBlack = darkBlack;
    this.textLightBlack = lightBlack;
    this.textMinBlack = minBlack;
    this.textFullWhite = fullWhite;
    this.textDarkWhite = darkWhite;
    this.textLightWhite = lightWhite;

    // font weight
    this.fontWeightLight = 300;
    this.fontWeightNormal = 400;
    this.fontWeightMedium = 500;

    //font size
    this.fontStyleButtonFontSize = 14;
    this.fontStyleBigFontSize = 40;
    this.fontStyleMediumFontSize = 28;
    this.fontStyleSmallFontSize = 26;
    this.fontStyleTinyFontSize = 18;
  }
}

export default new Typography();
