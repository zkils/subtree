import React from 'react';
import styles from './KeyInput.css';
import shallowCompare from 'react-addons-shallow-compare';
import ArrowBack from 'obgComponents/Icon/ArrowBack';
import Call from 'obgComponents/Icon/Call';

class KeyInput extends React.Component{

    constructor(props){
        super(props);
    }

    /**
     * propTypes form parent Component
     * @property {string} className
     */
    static get propTypes() {
        return {
            className : React.PropTypes.string,
            style : React.PropTypes.object,
            wrapperClass: React.PropTypes.string,
        };
    }

    /**
     * Check prop and state for performance
     * @param nextProps
     * @param nextState
     * @returns {bool}
     */
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    /**
     * render
     * @returns {XML}
     */
    render(){
        return (
            <div className={styles.Wrapper}>
                <div className={styles.NumKeyWrapper}>
                    <button data-value='1' onClick={this.props.onInput} className={styles.NumKey}>1</button>
                    <button data-value='2' onClick={this.props.onInput} className={styles.NumKey}>2</button>
                    <button data-value='3' onClick={this.props.onInput} className={styles.NumKey}>3</button>
                    <button data-value='4' onClick={this.props.onInput} className={styles.NumKey}>4</button>
                    <button data-value='5' onClick={this.props.onInput} className={styles.NumKey}>5</button>
                    <button data-value='6' onClick={this.props.onInput} className={styles.NumKey}>6</button>
                    <button data-value='7' onClick={this.props.onInput} className={styles.NumKey}>7</button>
                    <button data-value='8' onClick={this.props.onInput} className={styles.NumKey}>8</button>
                    <button data-value='9' onClick={this.props.onInput} className={styles.NumKey}>9</button>
                    <button data-value='*' onClick={this.props.onInput} className={styles.NumKey}>*</button>
                    <button data-value='0' onClick={this.props.onInput} className={styles.NumKey}>0</button>
                    <button data-value='#' onClick={this.props.onInput} className={styles.NumKey}>#</button>
                </div>
                <div className={styles.FuncKeyWrapper}>
                    <button data-value='+' onClick={this.props.onInput} className={styles.FuncKey}> + </button>
                    <button data-value='Backspace' onClick={this.props.onBackspace} className={styles.FuncKey}>
                        <ArrowBack className={styles.KeyIcon} />
                    </button>
                    <button data-value='Call'
                            onClick={this.props.onCall}
                            disabled={!this.props.isValidNumber}
                            className={styles.FuncKey}
                    >
                        <Call className={styles.CallIcon} />
                        <span className={styles.CallBtnText}>Call</span>
                    </button>
                </div>

            </div>
        );
    }
}

KeyInput.defaultProps = {
    onClear: function(){},
    onBackspace: function(){},
    onCall: function(){},
    className:'',
    wrapperClass:'',
};

export default KeyInput;

