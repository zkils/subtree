import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";

/**
 * Checkbox Component
 * @extends React.Component
 * @example
 * <Checkbox label={"label"} disabled={true} onChange={func} checked={ture} />
 *
 */
function getStyle(props, context){    
    const {obgTheme}  =  context;
    const {baseTheme, checkbox} = obgTheme;
    return {
        checkbox:{
            minWidth:"40px",
            minHeight:"40px",
            display:"inline-block",
            fontSize:"20pt",
            lineHeight:"300%",
            color:checkbox.textColor,
            WebkitUserSelect: "none",
            marginLeft:"15px",
            marginRight:"15px",
        },

        checkboxInput:{
            visibility:"hidden",
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip:"rect(0,0,0,0)",
            border: 0
        },
        checkboxContainer:{ 
            display: "inline-block",
            position: "relative",
            WebkitUserSelect: "none",
        },
        checkboxIcon:{
            display: "inline-block",
            width: "35px",  
            height: "35px",  
            lineHeight: "40px", 
            margin: "-2px 8px 0 0",
            textAlign: "center", 
            verticalAlign: "middle",
            backgroundColor: checkbox.backgroundColor,
        },
        disabledCheckboxIcon:{
            backgroundColor: checkbox.disabledBackgroundColor,
        },
        iconColor:checkbox.checkedColor,
        disabledIconColor :checkbox.disabledCheckedColor 
    };
}
class Checkbox extends React.Component{

    constructor(props){
        super(props);
        this.state={
            checked:this.props.checked,
        };

        this.handleChange= this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }




    handleChange(evt){
        this.setState({
            checked : evt.target.checked
        });
        this.props.onChange(evt.target.checked);
    }

    render(){
        const {
            style,
            disabled,
            ...other
        } = this.props;
        const styles = getStyle(this.props, this.context);

        return(
            <label {...other} style={Object.assign({}, styles.checkbox, style)}  >
                {(()=>{
                    if(!disabled){
                        return (<input type={"checkbox"} style={styles.checkboxInput} onChange={this.handleChange} checked={this.state.checked} />);

                    }else{
                        return (<input type={"checkbox"} style={styles.checkboxInput} disabled={"disabled"} checked={this.state.checked} />);
                    }
                })()}
                <div className={"dummyCheck"} style={styles.checkboxContainer} >
                    {(()=>{
                        let layoutSt = styles.checkboxIcon;     //default checkbox style
                        let fillColor = styles.iconColor;              //default checked color

                        if(disabled){
                            layoutSt = Object.assign(layoutSt, styles.disabledCheckboxIcon);
                            fillColor = styles.disabledIconColor;
                        }    

                        if(!this.state.checked) {                   //if not checked, not need to render check icon
                            return (<div style={layoutSt} ></div>);
                        }else{
                            return (<div style={layoutSt} > <svg  height='24px' viewBox='0 0 24 24' width='24px' ><path d='M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z' fill={fillColor} /></svg> </div>);
                        }
                    })()}
                </div>

                {(()=>{
                    if(this.props.label){
                        return <span>{this.props.label}</span>;
                    }
                })()}
            </label>
        );
    }

    /**
     * propTypes form parent Component
     * @property {string} label     - Text label for checkbox
     * @property {bool} disabled    - Component enable/disable status.
     * @property {func} onChange    - Check state change event handler.
     * @property {bool} show        - Property for component show/hide.
     * @property {object} style     - Style for component
     * @property {bool} checked     - Check status.
     *
     */
    static get propTypes() {
        return {
            label : React.PropTypes.string,
            disabled : React.PropTypes.bool,
            onChange : React.PropTypes.func,
            show : React.PropTypes.bool,
            style : React.PropTypes.object,
            checked: React.PropTypes.bool,
        };
    }
    static get contextTypes(){
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

Checkbox.defaultProps = {
    label:'',
    disabled:false,
    checked : false,
    show:true,
    style : {},
    onChange:function(){}
};

export default injectObgCom(Checkbox);
