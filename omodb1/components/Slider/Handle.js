
import React from 'react';
import injectObgCom from '../Common/injectObgCom';
import shallowCompare from 'react-addons-shallow-compare';

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let slider = _obgTheme.slider;
    return {
        handle:{
            position: 'absolute',
            background: 'linear-gradient(to bottom, rgba(254,254,254,1) 0%, rgba(219,219,219,1) 53%, rgba(156,156,156,1) 97%, rgba(156,156,156,1) 100%)',
            border: '2px solid white',
            boxShadow: '0px 0px 5px 1px rgba(0,0,2,0.7)',
        },
        handlePressed: {
            background: 'linear-gradient(to bottom, rgba(69,131,143,1) 0%, rgba(31,93,105,1) 70%, rgba(5,56,67,1) 100%)',
            border: '3px solid white',
        },
        rectHandle: {
            width: '24px',
            height: '29px',
            borderRadius: '3px',
        },
        circleHandle: {
            width: '32px',
            height: '32px',
            borderRadius: '16px',
        },
        rectHandleVertical: {
            width: '29px',
            height: '24px',
            borderRadius: '3px',
        },
        vertical: {
            marginLeft: 'auto',
            marginRight: 'auto',
            left: '0',
            right: '0',
        },
    };
}

class Handle extends React.Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
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
                onMouseDown={this.props.onMouseDown}
                style={Object.assign({},
                    styles.handle,
                    (this.props.handleType=='circle') ? styles.circleHandle : styles.rectHandle ,
                    (this.props.handleType=='rect'&& this.props.orientation=='vertical') ? styles.rectHandleVertical : {},
                    (this.props.orientation=='vertical') ? styles.vertical : {},
                    (this.props.dragStart) ? styles.handlePressed:{},
                    (this.props.orientation=='horizontal') ? {left: this.props.position + 'px'} : {bottom: this.props.position + 'px'}
                )}


            />
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }

}



Handle.defaultProps={
};

export default injectObgCom(Handle);