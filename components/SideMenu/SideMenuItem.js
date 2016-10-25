import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let sideMenu = _obgTheme.sideMenu;
    return {
        sideMenuItem : {
            height: '85px',
            borderBottom:'1px solid #595959',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontSize:'30'+'px',
        },
        innerContainer:{
            width: '100%',
            paddingLeft: '5px',
            paddingRight: '5px',
            display: 'flex',
        },
        selected:{
            backgroundColor: sideMenu.selectedColor,
            color: sideMenu.textColor,
        },
        pressed:{
            color:sideMenu.pressedColor,
        },
        disabled:{
            color:sideMenu.disabledTextColor,
        },
        icon:{
            flex:'1',
        },
        iconPressed:{
            fill:sideMenu.pressedColor,
        },
        label:{
            flex:'5',
        },
    };
}

/**
 * SideMenuItem Component
 * @extends React.Component
 * @example
 * <SideMenuItem show={true} />
 *
 * <SideMenuItem>
 *     <Icon>
 *     <span>
 * </SideMenuItem>
 */
class SideMenuItem extends React.Component{

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
        if(!this.props.disabled) {
            this.setState({
                pressed: true,
            });
            this.props.onMouseDown(e);

            e.stopPropagation();
        }
    }
    handlerMouseUp(e){
        if(!this.props.disabled) {
            this.setState({
                pressed: false,
            });
            this.props.onMouseUp(e);
        }
    }
    handlerMouseLeave(e){
        if(!this.props.disabled) {
            this.setState({
                pressed: false,
            });
        }
    }


    render(){

        const styles = getStyle(this.props, this.context);

        let contentChildren = [this.props.children];
        if(this.props.leftIcon){
            this.props.pushElement(contentChildren, this.props.leftIcon, Object.assign({},styles.icon, (this.state.pressed) ? styles.iconPressed : {} ));
        }
        if(this.props.label){
            if(this.props.label.type=='div'){
                this.props.pushElement(contentChildren, this.props.label, styles.label);
            }else{
                this.props.pushElement(contentChildren, <font>{this.props.label}</font>, styles.label);
            }
        }
        if(this.props.rightIcon){
            this.props.pushElement(contentChildren, this.props.rightIcon, Object.assign({},styles.icon, (this.state.pressed) ? styles.iconPressed : {} ) );
        }

        return (
            <div
                style={Object.assign({},
                    styles.sideMenuItem,
                    (this.props.selected) ? styles.selected : {},
                    (this.props.disabled) ? styles.disabled : {},
                    (this.state.pressed) ? styles.pressed : {},
                    this.props.style)}
                 onMouseDown = {this.handlerMouseDown}
                 onMouseUp = {this.handlerMouseUp}
                 onMouseLeave = {this.handlerMouseLeave}
                 className={this.props.className}
                 onClick={(this.props.disabled) ?  function(){} : this.props.onClick }
            >
                <div className={styles.innerContainer}>
                    {contentChildren}
                </div>
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} show - show / hide status
     * - default value `true`
     */
    static get propTypes() {
        return {
            show: React.PropTypes.bool
        };
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }

}

SideMenuItem.obgName = 'SideMenuItem';
SideMenuItem.defaultProps = {
    onMouseDown : ()=>{},
    onMouseMove : ()=>{},
    onMouseUp : ()=>{},
    onClick : ()=>{}
};
export default injectObgCom(SideMenuItem);
