import React from 'react';
import styles from './Dialer.css';
import classNames from 'classnames';
import KeyInput from './KeyInput';
import countryData from 'i18n/countryPhoneData';
import shallowCompare from 'react-addons-shallow-compare';

const allCountries = countryData.allCountries;

/**
 * Dialer Component
 * @example
 * <Dialer onChange={this.handleChange}/>
 */
class Dialer extends React.Component{
    /**
     * 생성자
     * state : value
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {
            value:'',
            formattedNumber:'',
            selectedCountry:'',
            isValidNumber:false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleBackspace = this.handleBackspace.bind(this);
        this.handleCall = this.handleCall.bind(this);
    }

    componentDidMount(){
        this._countryData = this.getCountryData(navigator.language || 'fr');
        this.setState({selectedCountry:this._countryData});
        //this.cursorToEnd(true);
        if(typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.formattedNumber, this.state.selectedCountry);
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    /**
     * get Country from country phone data
     * @param countryCode
     */
    getCountryData(countryCode){
        const countryIndex = this.props.onlyCountries.findIndex((countryData) => countryData.iso2 === countryCode);
        if(countryIndex > 0){
            return this.props.onlyCountries[countryIndex];
        }else{
            return this.props.onlyCountries[222];
        }
    }

    /**
     * set focus
     * @param skipFocus
     */
    cursorToEnd(skipFocus) {
        var input = this.refs.numberInput;
        if (skipFocus) {
            this.setState({formattedNumber: '+' + this._countryData.dialCode});
        } else {
            input.focus();
        }
    }

    /**
     * Format Number using Regex
     * @param text
     * @param pattern
     * @returns {*}
     */
    formatNumber(text, pattern) {
        // if(!text || text.length === 0) {
        //     return '+';
        // }
        //
        // if((text && text.length < 2) || !pattern) { // || !this.props.autoFormat
        //     return `+${text}`;
        // }
        if(!pattern){
            return text;
        }
        //let formattedNumber = (text.substring(this.state.selectedCountry.dialCode.length+1)).replace(/[ #\&\+\-%@=\/\\\:;,\.'\"\^`~\_|\!\?\*$#<>()\[\]\{\}]/i,'');
        let formattedNumber = text.replace( /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi,'');
        formattedNumber = formattedNumber.replace(pattern.regExp, pattern.output);
        //return '+' + this.state.selectedCountry.dialCode + formattedNumber;
        return formattedNumber;
    }



    /**
     * handel Input value
     * @param event
     */
    handleInput(event){
        let formattedNumber = this.state.formattedNumber,
            newSelectedCountry = this._countryData,
            inputValue = event.target.dataset.value;
        if(inputValue ==='*' || inputValue === '#' || inputValue === '+' || formattedNumber.includes('#') || formattedNumber.includes('*') || formattedNumber.includes('+')   ){
            this.setState({
                formattedNumber:this.state.formattedNumber + inputValue
            });
            return;
        }

        if(event.target.dataset.value.length > 0) {
            //let inputNumber = event.target.dataset.value.replace(/\D/g, '');
            let inputNumber = this.state.formattedNumber + event.target.dataset.value.replace(/\D/g, '');
            // if(this.state.selectedCountry.dialCode.length > inputNumber.length) {
            //     newSelectedCountry = this.guessSelectedCountry(inputNumber.substring(0, 6));
            // }
            formattedNumber = this.formatNumber(inputNumber, newSelectedCountry.format);
        }

        this.setState({
            formattedNumber: formattedNumber,
        }, function() {
            if(this.state.formattedNumber.length > 0){
                this.setState({
                    isValidNumber:true
                });
            }
            this.props.onChange(this.state.formattedNumber, this._countryData);
        });
    }

    /**
     * remove all number
     */
    handleClear(){
        this.setState({
            formattedNumber:''
        });
    }

    /**
     * remove one character
     */
    handleBackspace(){
        // if(this.state.formattedNumber === '+'+this.state.selectedCountry.dialCode ){
        //     return;
        // }
        let formattedNumber = this.state.formattedNumber;
        if(formattedNumber.includes('#') || formattedNumber.includes('*') || formattedNumber.includes('+')   ){
            this.setState({
                formattedNumber:formattedNumber.substring(0, formattedNumber.length-1)
            });
            return;
        }

        this.setState({
            formattedNumber:this.formatNumber(formattedNumber.substring(0, formattedNumber.length-1), this._countryData.format)
        },() => {
            if(this.state.formattedNumber.length < 1){
                this.setState({
                    isValidNumber:false
                });
            }
        });
    }

    /**
     * handle call
     */
    handleCall(){
        console.log('call');
        this.props.onCall();
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
     * render
     * @returns {XML}
     */
    render(){
        return (
            <div
                className={classNames(styles.Wrapper, this.props.wrapperClass)}
                style={this.props.style}
            >
                <div
                    className={styles.InputWrapper}
                >
                    <input
                        type='tel'
                        readOnly={true}
                        value={this.state.formattedNumber}
                        className={styles.InputBox}
                        ref='numberInput'
                    />
                </div>
                <KeyInput
                    type='dialer'
                    onInput={this.handleInput}
                    onClear={this.handleClear}
                    onBackspace={this.handleBackspace}
                    onCall={this.handleCall}
                    isValidNumber={this.state.isValidNumber}
                />

            </div>

        );
    }
}

Dialer.defaultProps = {
    className:'',
    wrapperClass:'',
    onlyCountries: allCountries,
    defaultCountry: allCountries[71].iso2,
    onCall:function(){},
    onChange:function(){}
};

export default Dialer;

