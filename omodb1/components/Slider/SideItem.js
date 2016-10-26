
import React from 'react';
import styles from './SideItem.css';
import injectObgCom from '../Common/injectObgCom';
import shallowCompare from 'react-addons-shallow-compare';
import TimeConverter from './TimeConverter';

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let slider = _obgTheme.slider;
    return {
        vertical:{
            position:'absolute',
        },
        iconPressed:{
            fill:slider.pressedColor,
        },
        label:{
            fontSize:slider.textSize,
            color:slider.textColor,
        }
    };
}

const sideItemCons = {
    beforeElement: {
        icon: 'headItem',
        label: 'headItem',
        number: 'min',
        time: {
            horizontal:'currentTimePos',
            vertical:'max',
        },
        horizontal:'min',
        vertical:'max',

    },
    afterElement: {
        icon: 'footItem',
        label: 'footItem',
        number: 'max',
        time: {
            horizontal:'max',
            vertical:'currentTimePos',
        },
        horizontal:'max',
        vertical:'min',
    }
};

class SideItem extends React.Component{
    constructor(props){
        super(props);
        this.getItemStyle = this.getItemStyle.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    getTimeLabel(obj){
        const propName = obj[this.props.orientation];
        let timeStr = this.props[propName];
        if(propName=='currentTimePos'){
            timeStr = TimeConverter.getCurrentTimeText(this.props.max,timeStr);
        }else if(/^\d+$/.test(timeStr)){
            timeStr = TimeConverter.secToTime(timeStr);
        }
        const align = (this.props.orientation=='vertical ') ? 'right' :'center';

        return <div style={Object.assign({width:'100px', textAlign:align}, this.styles.label )}>{timeStr}</div>;
    }

    getLabel(obj){
        if(obj || obj===0) {
            if (typeof(obj) == 'function') {
                return React.cloneElement(obj, {
                    style: this.styles.label,
                });
            } else {
                return <div style={this.styles.label}>{obj}</div>;
            }
        }else{
            return null;
        }
    }

    getIcon(obj,name){
        //let iconStyle = {width:'36px',height:'36px'};
        if(obj) {
            return React.cloneElement(obj, {
                className: styles.Icon,
                style: {width: '36px', height: '36px'},
            });
        }else{
            return null;
        }
    }

    getSideElement(name){
        const typeString = sideItemCons[name],
               minmax = typeString[this.props.orientation];
        switch (this.props.type){
            case 'icon':
                return this.getIcon(this.props[typeString.icon],name);
            case 'number':
                return this.getLabel(this.props[minmax]);
            case 'time':
                return this.getTimeLabel(typeString['time']);
            case 'text':
                return this.getLabel(this.props[typeString.label]);
            default:
                return <div />;
        }
    }

    getItemStyle(){
        let style = {};
        if(this.props.orientation=='vertical')   {
            //style.position = 'relative';
            if(this.props.name=='beforeElement'){             //TODO css개선
                style.marginBottom = (this.props.type=='icon') ? '11px' : '30px';
            }else{
                style.marginTop =(this.props.type=='icon') ? '11px' : '12px';
            }
        }else{
            if(this.props.name=='beforeElement'){             //TODO css개선
                style.marginRight = '10px';
            }else{
                style.marginLeft = '10px';
            }
        }
        style.boxSizing = 'border-box';
        return style;
    }

    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        const itemStyle = this.getItemStyle();
        this.styles =  getStyle(this.props, this.context);
        return(
            <div
                onClick={this.props.onClick}
                style={itemStyle}
            >
                {this.getSideElement(this.props.name)}
            </div>
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}


export default injectObgCom(SideItem);