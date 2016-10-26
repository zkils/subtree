import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SideMenu.css';
import classNames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";
import iScroll from "iscroll";


function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let sideMenu = _obgTheme.sideMenu;
    return {
        list: {
            overflow: 'hidden',
            height: '338px',
            position: 'absolute',
            top: '77px',
            width: '300px',
            zIndex: '10',
            backgroundColor: sideMenu.backgroundColor,
            paddingLeft: '20px',
            paddingRight: '20px',
            color: sideMenu.textColor,
        },
        left: {
            left: '0px',
            borderRight: '1px solid '+sideMenu.borderColor,
        },
        right: {
            left: '500px',
            borderLeft: '1px solid '+sideMenu.borderColor,
        },
        mask: {
            position: 'absolute',
            top: '75px',
            left: '0px',
            backgroundColor: sideMenu.maskColor,
            width: '1024px',
            height: '340px',
            zIndex: '5',
        },
    };
}

/**
 * SideMenu Component
 * @example
 * <SideMenu
 *     direction={'right'}
 *     onRequestClose={onCloseFunc}
 * >
 *      <SideMenuItem />
 *      <SideMenuItem />
 * </SideMenu>
 */
class SideMenu extends React.Component{

    constructor(props){
        super(props);

    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillMount(){
        this.options = {
            mouseWheel:false,
            bounce : false,
            click : true,
            momentum : !this.props.snap,
            snap: this.props.snap,
        };
    }
    componentDidMount(){
        this._iScrollInstance =  new iScroll(ReactDOM.findDOMNode(this.refs.list), this.options);
    }


    componentDidUpdate(){
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
        const styles = getStyle(this.props, this.context);

        return (
            <div
                style={this.props.wrapperStyle}
            >
                <div
                    style={Object.assign({}, styles.list, (this.props.direction =='left') ? styles.left : styles.right)}
                    className={this.props.className}
                    ref='list'
                >
                    <div>
                        {this.props.children}
                    </div>
                </div>
                <div
                    style={styles.mask}
                    onClick={this.props.onRequestClose}
                />
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {string} direction - left/right side option
     * @property {func} onRequestClose - side menu close event handler
     */
    static get propTypes() {
        return {
            direction : React.PropTypes.string,
            onRequestClose: React.PropTypes.func,
        };
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

SideMenu.obgName = 'SideMenu';
SideMenu.defaultProps = {
    className:'',
    wrapperStyle:{},
    snap : true,
    direction : 'right',
    onRequestClose : function() {}
};

export default injectObgCom(SideMenu);

