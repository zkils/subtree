

import {darken, fade, emphasize, lighten} from './utils/colorManipulator';
import obgBaseTheme from './baseThemes/obgBaseTheme';
import zIndex from './zIndex';
import callOnce from './utils/callOnce';
import rtl from './utils/rtl';
import compose from 'recompose/compose';
import typography from './typography';
import merge from 'lodash.merge';
import {
    red500, grey400, grey500, grey600, grey700,
    transparent, lightWhite, white, darkWhite, lightBlack, black, darkBlack
} from './colors';

/**
 * Get the Obigo theme corresponding to a base theme.
 * It's possible to override the computed theme values
 * by providing a second argument. The calculated
 * theme will be deeply merged with the second argument.
 */
export default function getObgTheme(obgTheme, ...more) {

    obgTheme = merge({
        zIndex,
        isRtl: false,
        userAgent: undefined,
    }, obgBaseTheme, obgTheme, ...more);

    const {spacing, fontFamily, palette} = obgTheme;
    const baseTheme = {spacing, fontFamily, palette};

    obgTheme = merge(
        {
            footer: {
                backgroundColor: palette.bg1Color,
                height: 78,
                width:baseTheme.spacing.horizontalMax,
                leftSpacing: '4px 0 4px 12px',
                rightSpacing: '4px 12px 4px 0',
                buttonBg:palette.primary1Color,
            },
            progressBar:{
                barColor:palette.primary2Color,
                backgroundColor:palette.bg1Color,
            },
          plainButton:{
            textColor : palette.textColor,
            pressedTextColor : palette.primary2Color,
            disabledTextColor : palette.text3Color,
          },
          header:{
              backgroundColor:palette.bg1Color,
          },
          toggle:{
            backgroundColor:palette.bg4Color,
            notCheckedBackgroundColor:palette.bg3Color,
            checkedBackgroundColor:palette.primary2Color,
            indicatorColor : palette.bg4Color,
          },
          buttonGroup:{
              backgroundColor:palette.bg3Color,
              borderColor:palette.border1Color,
              textColor : palette.textColor,
              selectedBackgroundColor:palette.primary2Color,
              selectedTextColor : palette.text2Color,
              pressedBackgroundColor : palette.accent3Color,
              pressedBorderColor : palette.border2Color,
          },
            button: {
                borderColor:palette.border3Color,
                textColor:palette.textColor,
                backgroundColor:palette.bg2Color,
                pressedBorderColor : palette.border2Color,
                pressedBackgroundColor: palette.accent3Color,
                disabledBackgroundColor:palette.bg5Color,
                disabledTextColor : palette.text3Color,
                disabledBorderColor: palette.border3Color,
            },
            checkbox: {
                backgroundColor:palette.bg4Color,
                disabledBackgroundColor:palette.bg5Color,
                textColor : palette.textColor,
                checkedColor :  palette.primary2Color,
                disabledCheckedColor : palette.bg3Color,

            },
            gridList:{
                textColor:palette.textColor,
            },
            gridListItem :{
                backgroundColor : palette.bg2Color,
                textColor:palette.textColor,
                pressedBorderColor : palette.border2Color,
                pressedBackgroundColor : palette.accent3Color,
                focusedBorderColor : palette.border2Color,
                disabledTextColor : palette.text3Color,
            },
            listItem:{
                divisionColor:palette.border1Color,
                pressedBorderColor:palette.border2Color,
                pressedBackgroundColor:palette.accent3Color,
                focusedBorderColor:palette.border2Color,
                disabledTextColor:palette.text3Color,
            },
            tab:{
                titleTextColor:palette.text3Color,
                selectedTitleTextColor:palette.primary2Color,
                underbarColor:palette.text3Color,
                selectedUnderbarColor:palette.primary2Color,
                pressedTitleTextColor:palette.text4Color,

            },
            radioButton:{
                margin:2,
                padding:4,
                horizontalWidth:240,
                itemheight:66,
                itemWidth:326,
                borderColor: palette.border2Color,
                iconBgColor : palette.bg3Color,
                backgroundColor: palette.primary1Color,
                pressedColor: palette.accent3Color,
                selectedColor: palette.primary2Color,
                disabledColor: palette.disabledColor,
                size: 24,
                labelColor: palette.textColor,
                labelDisabledColor: palette.disabledColor,
                itemMargin:5,
            },
            dropDownMenu: {
                accentColor: palette.borderColor
            },
            icon: {
                color: palette.canvasColor,
                backgroundColor: palette.primary1Color,
                accentColor:palette.accent1Color,
                iconSize : spacing.iconSize,
                iconSpacing : 6,
            },
            imgIcon:{
                iconSize : 40,
            },
            slider: {
                trackSize: 2,
                trackColor: palette.primary1Color,
                trackColorSelected: palette.accent1Color,
                handleSize: 12,
                handleSizeDisabled: 8,
                handleSizeActive: 18,
                handleColorZero: palette.primary3Color,
                handleFillColor: palette.alternateTextColor,
                selectionColor: palette.primary1Color,
                rippleColor: palette.primary1Color,
                textColor:palette.textColor,
                textSize:typography.fontStyleSmallFontSize,
                pressedColor:palette.accent1Color,
                tipColor:palette.bg2Color,
                tipBorderColor:palette.primary3Color,
                tipFontSize:typography.fontStyleTinyFontSize,
            },
            svgIcon: {
                color: palette.textColor
            },
            textField: {
                textColor: palette.alternateTextColor,
                hintColor: palette.disabledColor,
                disabledTextColor: palette.disabledColor,
                backgroundColor: palette.bg4Color,
                borderColor: palette.border2Color,
                pressedTextColor: palette.textColor,
                pressedBorderColor: palette.accent1Color,
                pressedBackgroundColor:palette.bg3Color,
                focusTextColor: palette.primary1Color,
                focusBorderColor: palette.accent1Color,
                focusBackgroundColor: palette.bg4Color,
                inputFontSize:typography.fontStyleMediumFontSize,
            },
            clock: {
                minWidth: 54,
                fontSizeBig: 37,
                fontSizeMedium: typography.fontStyleMediumFontSize,
            },
            searchBar:{
                textColor: palette.alternateTextColor,
                hintColor: palette.disabledColor,
                disabledTextColor: palette.disabledColor,
                backgroundColor: palette.bg4Color,
                borderColor: palette.border2Color,
                pressedTextColor: palette.textColor,
                pressedBorderColor: palette.accent1Color,
                pressedBackgroundColor:palette.bg3Color,
                focusTextColor: palette.primary1Color,
                focusBorderColor: palette.accent1Color,
                focusBackgroundColor: palette.bg4Color,
                inputFontSize:typography.fontStyleMediumFontSize,
            },
            sideMenu:{
                textColor: palette.textColor,
                disabledTextColor: palette.disabledColor,
                alternateTextColor : palette.alternateTextColor,
                borderColor:palette.border4Color,
                backgroundColor: palette.primary1Color,
                maskColor: fade(darkBlack,0.4),
                selectedColor:palette.accent1Color,
                pressedColor:palette.accent1Color,
            },
        },
        obgTheme,
        {
            baseTheme: baseTheme, // To provide backward compatibility.
            rawTheme: baseTheme
        }
    );

    const transformers = [rtl, callOnce].map((t) => t(obgTheme))
        .filter((t) => t);
    obgTheme.prepareStyles = compose(...transformers);

    return obgTheme;
}
