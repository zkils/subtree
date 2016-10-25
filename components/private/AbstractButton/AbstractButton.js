import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * AbstractButton Component.
 * It is used in obgComponents internally.
 * private component.
 * @extends React.Component
 * @example
 * <AbstractButton label={"label"} disable={true} onClick={func} />
 *
 * <AbstractButton>
 *  <div>button text</div>
 * </AbstractButton>
 */
class AbstractButton extends React.Component{

    constructor(props){
        super(props);

        this.state={
            pressed:this.props.pressed ?true : false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.getMergedStyle = this.getMergedStyle.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    handleClick(e){
        this.props.onClick(e);
        e.stopPropagation();
    }
    handleDown(e){
        this.setState({
            pressed:true
        });
        this.props.onMouseDown();
        e.stopPropagation();
    }



    handleRelease(){
        this.setState({
            pressed:false
        });
        this.props.onMouseUp();
    }



    handleLeave(){
        this.setState({
            pressed:false
        });
        this.props.onMouseLeave();
    }



    getMergedStyle(){
        let newStyle;
        if(this.state.pressed){
            newStyle = Object.assign({}, this.props.buttonStyle, this.props.style, this.props.pressedStyle);
        }else if(this.props.disabled){
            newStyle = Object.assign({}, this.props.buttonStyle,this.props.style, this.props.disabledStyle);
        }else if(this.props.focused){
            newStyle = Object.assign({}, this.props.buttonStyle,this.props.style, this.props.focusedStyle);
        }else{
            newStyle = Object.assign({}, this.props.buttonStyle, this.props.style);
        }

        return newStyle;
    }

    render(){
        const {
            show,
            pushElement,
            iconPos,
            buttonStyle,
            pressedStyle,
            disabledStyle,
            focusedStyle,
            focused,
            textBtn,
            onClick,
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            style,

            ...other
        } = this.props;

        
        const inlineSt = this.getMergedStyle();
        if(onClick){
            return(
                <button {...other} 
                    onClick={this.handleClick}
                    onMouseDown={this.handleDown}
                    onMouseUp={this.handleRelease}
                    onMouseLeave={this.handleLeave}
                    style={inlineSt}
                >
                {this.props.children}
                </button>
            );
        }else{
            return(
                <button {...other} 
                    style={inlineSt}
                >
                {this.props.children}
                </button>
            );
        }
    }

    /**
     * propTypes form parent Component
     * @property {string} label     - Button label
     * @property {bool} disabled    - Button disabel/enabel status
     * @property {bool} focused     - Button focuse status
     * @property {func} onClick     - onclick event handler
     * @property {func} onMouseDown - Mouse down event handler
     * @property {func} onMouseUp   - Mouse up event handler
     * @property {func} onMouseLeave   - Mouse leave event handler
     * @property {object} buttonStyle  - Normal state button style
     * @property {object} pressedStyle  - Pressed state button style
     * @property {object} disabledStyle  - Disabled state button style
     */
    static get propTypes() {
        return {
            label : React.PropTypes.string,
            disabled : React.PropTypes.bool,
            focused : React.PropTypes.bool,
            onClick : React.PropTypes.func,
            onMouseDown : React.PropTypes.func,
            onMouseUp : React.PropTypes.func,
            onMouseLeave : React.PropTypes.func,
            buttonStyle : React.PropTypes.object,
            disabledStyle : React.PropTypes.object,
            pressedStyle : React.PropTypes.object,
        };
    }
}
AbstractButton.defaultProps = {
    onMouseDown : ()=>{},
    onMouseUp : ()=>{},
    onMouseLeave : ()=>{},
    buttonStyle : {},
    disabledStyle : {},
    pressedStyle : {},
    focused : false,

};

export default AbstractButton;
