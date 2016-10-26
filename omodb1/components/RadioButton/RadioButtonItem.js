import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let radioButton = _obgTheme.radioButton;
    return {
        radioButtonItem : {
            position: 'relative',
            height: radioButton.itemheight+'px',
            width: radioButton.itemWidth+'px',
            background: radioButton.backgroundColor,
            color: radioButton.labelColor,
            marginBottom: radioButton.itemMargin + 'px',
            marginLeft:radioButton.itemMargin + 'px',
        },
        selected:{
            background: radioButton.selectedColor,
            color: 'black',
        },
        pressed:{
            background: radioButton.pressedColor,
            boxShadow: '0 0 0 2px ' + radioButton.borderColor,
            color:radioButton.labelColor,
        },
        disabled:{
            background :'blue !important',
        },
        leftIcon:{
            float: 'left',
            marginLeft: '11px',
            height: '84%',
            lineHeight: '62px',
        },
        rightIcon:{
            right: '1em',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
        },
        iconSelected:{
            filter: 'invert(100%)',
        },
        defaultIcon:{
            right: '1em',
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: radioButton.iconBgColor,
            border: '3px solid ' + radioButton.borderColor,
            boxShadow: '0 0 0 5px ' + radioButton.borderColor,
        },
        defaultIconSelected:{
            backgroundColor:radioButton.pressedColor,
            border: '3px solid ' + radioButton.borderColor,
            boxShadow: '0 0 0 5px ' + radioButton.borderColor,
            width: '18px',
            height: '18px',
        },
        text:{
            position:'relative',
            float: 'left',
            marginLeft:'11px',
            fontSize: '26px',
            lineHeight: '62px',
        },
        horizontal:{
            float:'left',
            width:radioButton.horizontalWidth+'px',
        },
        nonBackground:{
            background: 'none',
            border: 'none',
            boxShadow: 'none',
        },
    };
}

/**
 * RadioButtonItem Component
 * @extends React.Component
 * @example
 * <RadioButtonItem
 *  rightIcon={<RightIcon />}
 *  leftIcon={<LeftIcon />}
 *  selected={0}
 *  disabled={false}
 * >
 *  Label
 * </RadioButtonItem>
 */
class RadioButtonItem extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pressed:false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    handleClick(e){
        this.props.onClick(e, this.props.index);
    }
    handlePress(e){
        this.setState({
            pressed:true,
        });
    }
    handleRelease(e){
        this.setState({
            pressed:false,
        });

    }

    render(){
        const styles = getStyle(this.props, this.context);
        let contentChildren = [this.props.children];
        if(this.props.leftIcon){
            this.props.pushElement(contentChildren, this.props.leftIcon, Object.assign({},styles.leftIcon, (this.props.selected)? styles.iconSelected: {},this.props.leftIconStyle) );
        }
        if(this.props.text){
            this.props.pushElement(contentChildren, <font>{this.props.text}</font>, styles.text );
        }
        if(this.props.rightIcon){
            this.props.pushElement(contentChildren, this.props.rightIcon, Object.assign({},styles.rightIcon,  (this.props.selected)? styles.iconSelected: {}, this.props.rightIconStyle) );
        }else{
            const rightDefault = <div style={Object.assign({},styles.defaultIcon, (this.props.selected) ? styles.defaultIconSelected : {}, this.props.rightIconStyle)} />;
            this.props.pushElement(contentChildren, rightDefault);
        }

        return (
            <div
                style={Object.assign({},
                    styles.radioButtonItem,
                    (this.props.selected) ? styles.selected : {},
                    (this.props.disabled) ? styles.disabled : {},
                    (this.props.horizontal) ? styles.horizontal : {},
                    (this.props.nonBackground) ? styles.nonBackground : {},
                    (this.state.pressed) ? styles.pressed : {},
                    this.props.style)}
                onClick={(this.props.disabled) ?  function(){} : this.handleClick }
                onMouseDown={this.handlePress}
                onMouseUp={this.handleRelease}
                onMouseLeave={this.handleRelease}
            >
                {contentChildren}
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {object} rightIcon - react component or dom
     * @property {object} leftIcon - react component or dom
     * @property {bool} selected - selected status
     * @property {bool} disabled - disabled status
     */
    static get propTypes() {
        return {
            rightIcon : React.PropTypes.object,
            leftIcon :  React.PropTypes.object,
            selected : React.PropTypes.bool,
            disabled : React.PropTypes.bool,
        };
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

RadioButtonItem.obgName = 'RadioButtonItem';
RadioButtonItem.defaultProps = {
    rightIcon : null,
    leftIcon : null,
    leftIconStyle:{},
    rightIconStyle:{},
    className : '',
};

export default injectObgCom(RadioButtonItem);
