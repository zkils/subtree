import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";
import iScroll from "iscroll";

/**
 * List Component
 * @extends React.Component
 * @example
 * <List >
 *  <ListItem> hello </ListItem>
 *  <ListItem> hello </ListItem>
 *  <ListItem> hello </ListItem>
 * </List >
 *
 */
class List extends React.Component{

    constructor(props){
        super(props);
        
        this.options = {
            mouseWheel:false,
            bounce : false,
            click : true,
            momentum :false, 
            snap: " div > button",
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidUpdate(){
        if(this._iScrollInstance ){
            this._iScrollInstance.destroy();
            this._iScrollInstance=null;
        }
        this._iScrollInstance =  new iScroll(ReactDOM.findDOMNode(this), this.options);
    }


    componentDidMount(){
        if(this._iScrollInstance ){
            this._iScrollInstance.destroy();
            this._iScrollInstance=null;
        }
        this._iScrollInstance =  new iScroll(ReactDOM.findDOMNode(this), this.options);
    }
    componentWillUnmount(){
        if(this._iScrollInstance ){
            this._iScrollInstance.destroy();
            this._iScrollInstance=null;
        }
    }

    render(){
        let newStyle;
        const {
            style,
            className,
            show,
            pushElement,
            ...other
        } = this.props;
        newStyle = Object.assign({}, {height:"420px",position:"relative"}, style, {overflow:"hidden"} );


        return (
            <div style={newStyle} {...other} className={className} >
                <div >
                    {this.props.children}
                </div>
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} show        - Property for component show/hide.
     * @property {object} style     - Style for component
     */
    static get propTypes() {
        return {
            show: React.PropTypes.bool,
            style : React.PropTypes.object
        };
    }

}
List.defaultProps = {
    show:true,
    style : {}
};

export default injectObgCom(List);
