import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";
import AbstractButton from "../private/AbstractButton/AbstractButton";


function getStyle(context){
    const {obgTheme}  =  context;
    const {baseTheme, listItem} = obgTheme;
    return{
        listItem:{
            height:"70px",
            borderBottom:"1px solid "+listItem.divisionColor,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"transparent",
            color:"white",
            textAlign:"inherit",
            width:"100%",
            paddingLeft:"30px",
            paddingRight:"30px",
            paddingBottom:"1px",
            paddingTop:"2px",
        },
        pressed:{
            borderTop:"2px solid "+listItem.pressedBorderColor,
            borderBottom:"2px solid "+listItem.pressedBorderColor,
            borderLeft:"2px solid "+listItem.pressedBorderColor,
            borderRight:"2px solid "+listItem.pressedBorderColor,
            backgroundColor:listItem.pressedBackgroundColor,
            paddingLeft:"28px",
            paddingRight:"28px",
            /*
            paddingTop:"0px",
            paddingBottom:"1px",
            */
        },
        focused : {
            borderTop:"2px solid "+listItem.focusedBorderColor,
            borderBottom:"2px solid "+listItem.focusedBorderColor,
            borderLeft:"2px solid "+listItem.focusedBorderColor,
            borderRight:"2px solid "+listItem.focusedBorderColor,
            paddingLeft:"28px",
            paddingRight:"28px",
        },
        disabled:{
            color:listItem.disabledTextColor,
        }
    };
}

/**
 * ListItem Component
 * @extends React.Component
 * @example
 * <ListItem> hello  </ListItem>
 *
 */
class ListItem extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pressed : false,
        };

        this.handlerMouseDown = this.handlerMouseDown.bind(this);
        this.handlerMouseUp = this.handlerMouseUp.bind(this);
        this.handlerMouseLeave = this.handlerMouseLeave.bind(this);
        
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    handlerMouseDown(e){
        this.setState({
            pressed:true,
        });
        this.props.onMouseDown(e);

        e.stopPropagation();
    }
    handlerMouseUp(e){
        this.setState({
            pressed:false,
        });
        this.props.onMouseUp(e);
    }
    handlerMouseLeave(e){
        this.setState({
            pressed:false,
        });
    }



    render(){
        const styles = getStyle(this.context);
        const {
            className,
            pressedStyle,
            disabledStyle,
            style,
            focusedStyle,
            ...other,
        } = this.props;

        
        return (
            <AbstractButton className={this.props.className} 
                buttonStyle = {Object.assign({}, styles.listItem, this.props.style)}
                pressedStyle = {Object.assign({},styles.pressed, this.props.pressedStyle)}
                disabledStyle = {Object.assign({}, styles.disabled, this.props.disabledStyle)}
                {...other}
            >
                {this.props.children}
            </AbstractButton>
        );
    }

    /**
     * description propTypes form parent component.
     * @property {func} onClick         - onclick event cb
     * @property {oject} style          - style for normal state
     * @property {oject} pressedStyle  - style for pressed state
     * @property {oject} focusedStyle  - style for focused state
     * @property {oject} disabledStyle - style for disabled state
     */
    static get propTypes() {
        return {
            show: React.PropTypes.bool,
            onClick : React.PropTypes.func,
            style: React.PropTypes.object,
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

ListItem.defaultProps = {
    style: {},
    pressedStyle : {},
    focusedStyle : {},
    disabledStyle : {},
    onMouseDown : ()=>{},
    onMouseMove : ()=>{},
    onMouseUp : ()=>{},
};
export default injectObgCom(ListItem);
