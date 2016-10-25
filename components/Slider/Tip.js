
import React from 'react';
import ReactDOM from 'react-dom';
import injectObgCom from '../Common/injectObgCom';
import TimeConverter from './TimeConverter';

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let slider = _obgTheme.slider;
    return {
        vertical:{
            marginLeft : '90%',
        },
        horizontal:{
            marginTop:'-2em',
        },
        tip:{
            position: 'absolute',
            backgroundColor: slider.tipColor,
            borderRadius: '4px',
            padding: '5px',
            border: '1px solid '+slider.tipBorderColor,
            zIndex: '5',
            fontSize: slider.tipFontSize+'px',
        }
       /*

        .Tip{
        position: absolute;
        background-Color: rgb(24, 24, 24);
        border-Radius: 4px;
        padding: 5px;
        border: 1px solid rgb(69, 68, 68);
        z-index:5;
        font-size:18px;
        }
        */
    };
}

class Tip extends React.Component{
    constructor(props){
        super(props);
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle(){
        let style = {};
        if(this.props.orientation=='horizontal') {
            style.left = this.props.position + 'px';
        } else {
            style.bottom = this.props.position + 'px';
            if(this.props.type=='time' && TimeConverter.getCurrentTimeText(this.props.max, 100).length > 6){
                style.marginLeft = '70%';
            }
        }
        return style;
    }
    getTipText(ratio){
        if(this.props.type!=='time') {
            return Math.round(this.props.max * ratio / 100,1);
        }else{
            return TimeConverter.getCurrentTimeText(this.props.max, ratio);
        }
    }

    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        const styles = getStyle(this.props, this.context);

        return(
            <div
                style={Object.assign({},
                    styles.tip,
                    (this.props.orientation=='vertical') ? styles.vertical : styles.horizontal,
                    this.getStyle()
                )}
            >
                {this.getTipText(this.props.ratio)}
            </div>
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}


export default injectObgCom(Tip);