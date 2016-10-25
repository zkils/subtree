import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";
import AbstractButton from "../private/AbstractButton/AbstractButton";
function getStyle(props, context){
    const {obgTheme}  =  context;
    const {baseTheme, plainButton} = obgTheme;

    return {
        button:{
            border:"0",
            color:plainButton.textColor,
            fontSize:"20px",
            outline:"none",
            minWidth: "100px",
            height: "54px",
            paddingLeft:"10px",
            paddingRight:"10px",
            WebkitUserSelect:"none",
            position:"relative",
            verticalAlign:"middle",
            backgroundColor:"transparent",
        },
        iconButton:{
            minWidth:"54px",
        },
        pressed:{
            color:plainButton.pressedTextColor,
        },
        focused:{
        },
        disabled:{
            color:plainButton.disabledTextColor,
            pointerEvents:"none",
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
           display:"flex",
           alignItems:"center",
           justifyContent:"center",

        },
    };
}

/**
 * PlainButton Component
 * @extends React.Component
 * @example
 * <PlainButton label={"label"} disable={true} onClick={func} />
 *
 */
class PlainButton extends React.Component{

    constructor(props){
        super(props);



    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }



    alignIconAndLabel(styles){

        if(this.props.icon){
            let iconPosStyle = {};
            if(this.props.iconPos == 'left'){
                iconPosStyle = styles.iconLeft;
            }else if(this.props.iconPos == 'right'){
                iconPosStyle = styles.iconRight;
            }else if(this.props.iconPos == 'top'){
                iconPosStyle = styles.iconTop;
            }else if(this.props.iconPos == 'bottom'){
                iconPosStyle = styles.iconBottom;
            }
            let newIcon = React.cloneElement(this.props.icon, {
                style : Object.assign({}, this.props.icon.props.style, { margin:'0 0 0 0' })
            });

            return (
                <div style = {Object.assign({}, styles.iconContainer, iconPosStyle)} >
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
                <div style={Object.assign({}, styles.iconContainer, styles.textOnly)}  >
                    <div style={{display:"flex"}} >
                        {this.props.label}
                    </div>
                </div>
            );
        }
        
    }


    render(){

        const styles = getStyle(this.props, this.context);
        const{
            label,
            ...other
        } = this.props;
        let btnStyle ;
        if(label){
            btnStyle = Object.assign({}, styles.button, this.props.buttonStyle);
        }else{
            btnStyle = Object.assign({}, styles.button, styles.iconButton, this.props.buttonStyle);
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
PlainButton.defaultProps = {
    label:'',
    icon : '',
    iconPos : 'left',
    disabled :false,
    show:true,
    onClick:function(){},
    onMouseUp : function(){},
    onMouseDown : function(){},
    onMouseLeave : function(){},
};

export default injectObgCom(PlainButton);
