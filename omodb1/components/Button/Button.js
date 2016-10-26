import React from 'react';
import classnames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";
import AbstractButton from "../private/AbstractButton/AbstractButton";



function getStyle(props, context){
    const {obgTheme}  =  context;
    const {baseTheme, button} = obgTheme;
    return {
        button : {
            border:"2px solid "+button.borderColor,
            boxShadow:"inset 0 2px 0 #444444",
            color:button.textColor,
            fontSize:"20px",
            outline:"none",
            minWidth: "100px",
            height: "54px",
            paddingLeft:"10px",
            paddingRight:"10px",
            WebkitUserSelect:"none",
            backgroundColor:button.backgroundColor,
            borderRadius:"7px",
            position:"relative",
            verticalAlign:"middle",
        },
        iconButton:{
            minWidth:"54px",
        },
        pressed:{
            border:"2px solid "+button.pressedBorderColor,
            paddingLeft : "8px",
            paddingRight: "8px",
            backgroundColor:button.pressedBackgroundColor,
            boxShadow:"none",
        },
        disabled:{
            backgroundColor:button.disabledBackgroundColor,
            color:button.disabledTextColor,
            border:"2px solid "+button.disabledBorderColor,
            pointerEvents :"none",
        },
        focused:{
        },
        iconLeft:{
           display:"flex", 
           alignItems:"center",
           justifyContent:"center",
           flexDirection:"row",
        },
        iconRight:{
           display:"flex", 
           alignItems:"center",
           justifyContent:"center",
           flexDirection:"row-reverse",
        },
        iconTop :{
           display:"flex", 
           alignItems:"center",
           justifyContent:"center",
           flexDirection:"column",
        },
        iconBottom:{
           display:"flex", 
           alignItems:"center",
           justifyContent:"center",
           flexDirection:"column-reverse",
        },
        textOnly:{
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
        }
    };



}


/**
 * Button Component
 * @extends React.Component
 * @example
 * <Button label={"label"} disable={true} onClick={func} />
 *
 */
class Button extends React.Component{

    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    alignIconAndLabel(styles){
        if(this.props.icon){
            let iconPosStyle = "";
            if(this.props.iconPos == 'left'){
                iconPosStyle = styles.iconLeft;
            }else if(this.props.iconPos == 'right'){
                iconPosStyle = styles.iconRight;
            }else if(this.props.iconPos == 'top'){
                iconPosStyle = styles.iconTop;
            }else if(this.props.iconPos == 'bottom'){
                iconPosStyle = styles.iconBottom;
            }

            console.log(this.props.icon);
            let newIcon = React.cloneElement(this.props.icon, {
                style : Object.assign({}, this.props.icon.props.style, { margin:'0 0 0 0' })
            });

            return (
                <div style = {Object.assign({}, iconPosStyle, styles.iconContainer)}  >
                    <div style={{display:"flex"}} >
                        {newIcon}
                    </div>
                    <div style={{display:"flex"}} >
                        {this.props.label}
                    </div>
                </div>
            );
        }else{
            return (
                <div style = {Object.assign({},styles.iconContainer, styles.textOnly)}  >
                    <div style={{display:"flex"}} >
                        {this.props.label}
                    </div>
                </div>
            );
        }
        
    }


    render(){
        const styles = getStyle(this.props, this.context);
        const {
            label,
            pressedStyle,
            style,
            disabledStyle,
            focusedStyle,
            ...other
        } = this.props;
        let btnStyle; 
        if(label){
            btnStyle = Object.assign({}, styles.button, this.props.style);
        }else{
            btnStyle = Object.assign({}, styles.button, styles.iconButton, this.props.style);
        }
        return(
            <AbstractButton {...other} 
                buttonStyle = {btnStyle}
                pressedStyle = {Object.assign({}, styles.pressed, this.props.pressedStyle)}
                disabledStyle = {Object.assign({}, styles.disabled, this.props.disabledStyle)}
                focusedStyle = {Object.assign({}, styles.focused, this.props.focusedStyle)}
            >
                {this.alignIconAndLabel(styles)}
            </AbstractButton>
        );
    }

    /**
     * propTypes form parent Component
     * @property {string} label         - Button label. 
     * @property {bool} disabled        - Component enable/disable status.
     * @property {func} onClick         - Click event callback function.
     * @property {object} icon          - Icon component for button icon.
     * @property {string} iconPos       - Icon position in Button.(left|right|top|bottom)
     * @property {bool} show            - Property for component show/hide.
     * @property {oject} style          - Style for component
     * @property {oject} pressedStyle  - Style for pressed state
     * @property {oject} focusedStyle  - Style for focused state
     * @property {oject} disabledStyle - Style for disabled state
     *
     */
    static get propTypes() {
        return {
            label : React.PropTypes.string,
            disabled : React.PropTypes.bool,
            onClick : React.PropTypes.func,
            icon : React.PropTypes.object,
            iconPos : React.PropTypes.string,
            show : React.PropTypes.bool,
            style : React.PropTypes.object,
            pressedStyle : React.PropTypes.object,
            focusedStyle : React.PropTypes.object,
            disabledStyle : React.PropTypes.object,

        };
    }
    static get contextTypes(){
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}
Button.obgName = "Button";
Button.defaultProps = {
    label:'',
    icon : '',
    iconPos : 'left',
    disabled :false,
    show:true,
    onClick : function(){},
    style : {},
    pressedStyle : {},
    focusedStyle : {},
    disabledStyle : {}
};

export default injectObgCom(Button);
