import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";

/**
 * Toggle Component
 * @extends React.Component
 * @example
 * <Toggle disabled={true} onChange={func} />
 *
 */
function getStyle(props, context){
    const {obgTheme}  =  context;
    const {baseTheme, toggle} = obgTheme;

    return {
        toggle:{
            minWidth:"70px",
            minHeight:"40px",
            display:"inline-block",
            lineHeight:"300%",
            WebkitUserSelect: "none"
        },

        //toggle input[type="checkbox"] {  
        toggleInput:{  
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
        //toggle input[type="checkbox"] + .toggleBox {
        toggleBox:{
            display: "block",
            position: "relative",
            WebkitUserSelect: "none",
            width: "70px",  
            height: "40px",  
            lineHeight: "45px", 
            backgroundColor: toggle.backgroundColor,
            borderRadius : "40px",
        },
        //toggle input[type="checkbox"] + .toggleBox .outerLayer{
        outerLayer:{
            width:"60px",
            height:"32px",
            margin:"auto",
            marginTop:"3px",
            borderRadius:"30px",
            position:"absolute",
            top:"1px",
            left:"5px",
        },
        //toggle input[type="checkbox"]:not(:checked) + .toggleBox .outerLayer{
        notCheckedOuterLayer:{
            backgroundColor:toggle.notCheckedBackgroundColor,
        },
        checkedOuterLayer:{
            backgroundColor: toggle.checkedBackgroundColor,
        },
        indicator:{
            marginTop:"1px",
            width:"30px",
            height:"30px",
            borderRadius:"50%",
            backgroundColor:toggle.indicatorColor,
        },
        checkedIndicator:{
            float:"right",
        }
    };
}
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            on : this.props.on
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        this.setState({
            on : nextProps.on
        });
        return shallowCompare(this, nextProps, nextState);
    }


    handleChange(evt){
        this.setState({
            on: evt.target.checked
        });
        this.props.onChange(evt.target.checked);
        evt.stopPropagation();
    }
    render(){
        const styles = getStyle(this.props, this.context);
        const {
            style,
            ...other
        } = this.props;
            
        let outerLayerOption= this.state.on ? styles.checkedOuterLayer: styles.notCheckedOuterLayer;
        let indicatorOption = this.state.on ? styles.checkedIndicator : {};

        return(
            <label {...other} style={Object.assign({},styles.toggle, style)} >
                {(()=>{
                    if(!this.props.disabled){
                        return (<input type={"checkbox"} style={styles.toggleInput} onChange={this.handleChange} checked={this.state.on} />);
                    }else{
                        return (<input type={"checkbox"}  style={styles.toggleInput}   disabled={"disabled"} checked={this.state.on} />);
                    }
                })()}
                <div  style={styles.toggleBox} >
                    <div style={Object.assign({}, styles.outerLayer, outerLayerOption)}  >
                        <div style={Object.assign({}, styles.indicator, indicatorOption)} ></div>
                    </div>
                </div>
            </label>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} show        - toggle button showing 
     * @property {bool} disabled    - toggle button status
     * @property {func} onChange    - change on/off cb
     */
    static get propTypes() {
        return {
            disabled : React.PropTypes.bool,
            show : React.PropTypes.bool,
            onChange : React.PropTypes.func,
        };
    }
    static get contextTypes(){
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

Toggle.defaultProps = {
    disabled:false,
    show:true,
    on:true,
    onChange:function(){}
};

export default injectObgCom(Toggle);
