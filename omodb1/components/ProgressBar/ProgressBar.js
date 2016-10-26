import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let progressBar = _obgTheme.progressBar;
    return {
        progressBar : {
            margin: '0 auto',
            position: 'relative',
            background: progressBar.backgroundColor,
            width: '600px',
            minHeight: '6px',
        },
        barFragment:{
            position: 'absolute',
            display: 'block',
            height: '100%',
            background: progressBar.barColor,
        },
        buffer:{
            position: 'absolute',
            display: 'block',
            height: '100%',
            backgroundColor: '#383838',
        }
    };
}

/**
 * ProgressBar Component
 * @extends React.Component
 * @example
 * <ProgressBar
 *   value={50}  //percent
 *   bufferValue={60} //percent
 *   barFragmentClass={fragmentClass}
 *   wrapperClass={wrapperClass}
 * />
 */
class ProgressBar extends React.Component{
    constructor(props){
        super(props);
    }

    /**
     * propTypes form parent Component
     * @property {number} value - percent
     *  - default value `0`
     * @property {number} bufferValue - percent
     *  - default value `0`
     * @property {string} wrapperClass - css for progressbar wrapper
     * @property {string} barFragmentClass - css for bar
     */
    static get propTypes() {
        return {
            value: React.PropTypes.number,
            bufferValue: React.PropTypes.number,
            wrapperClass: React.PropTypes.string,
            barFragmentClass: React.PropTypes.string,
        };
    }


    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    render(){
        const styles = getStyle(this.props, this.context);
        return (
            <div
                className={this.props.wrapperClass}
                style={Object.assign({},styles.progressBar,this.props.style)}
            >
                <div
                    className={this.props.barFragmentClass}
                    style={Object.assign({}, styles.barFragment, {width: this.props.value + '%'})}
                />
                {(()=> {
                    if (this.props.bufferValue > 0) {
                        return <div
                            style={Object.assign({}, styles.buffer, {width: this.props.bufferValue + '%'})}
                        />;
                    }
                })()}
            </div>
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}
ProgressBar.obgName = 'ProgressBar';
ProgressBar.defaultProps = {
    value:0,
    bufferValue:0,
    className:'',
    wrapperClass:'',
    barFragmentClass:''
};

export default ProgressBar;

