import React from 'react';
import injectObgCom from '../Common/injectObgCom';
import MagGlass from 'obgComponents/Icon/MagGlass';


function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let searchBar = _obgTheme.searchBar;
    return {
        searchBar:{
            display: 'inline-block',
            padding: '5px',
            minHeight: '60px',
        },
        inputBase:{
            width: '500px',
            height: '60px',
            padding: '0 24px 3px',
            backgroundColor:  searchBar.backgroundColor,
            border: '5px solid ' + searchBar.borderColor,
            fontSize: searchBar.inputFontSize+'px',
            color: searchBar.textColor,
            boxSizing: 'border-box',
        },
        inputBaseFocus:{
            border: '5px solid ' + searchBar.focusBorderColor,
            outline: 'none',
        },
        inputBasePressed:{
            backgroundColor:searchBar.pressedBackgroundColor,
            color:searchBar.pressedTextColor,
        },
        searchButton:{
            width: '60px',
            height: '60px',
            backgroundColor: searchBar.backgroundColor,
            float: 'right',
            padding: '0px',
            margin: '0 0 0 2px',
            borderRadius: '0px',
            border: '5px solid ' + searchBar.borderColor,
        },
        searchButtonPressed:{
            backgroundColor:searchBar.pressedBackgroundColor,
            color:searchBar.pressedTextColor,
            border: '5px solid ' +  searchBar.pressedBorderColor,
        },
        searchButtonDisabled:{
            filter: 'brightness(0.7)',
            cursor: 'default',
            pointerEvents: 'none',
        },
        icon:{
            stroke: searchBar.pressedBackgroundColor,
            strokeWidth: '2px',
            width: '2.5rem',
            height: '2.5rem',
        },
        iconPressed:{
            stroke: searchBar.backgroundColor,
        },
    };
}

/**
 * SearchBar Component
 * @example
 * <SearchBar
 *  defaultVale='SearchBar'
 *  hintText='HintText'
 * />
 */
class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value:this.props.defaultValue,
            pressed:false,
            inputPressed:false,
            focused:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleInputPress = this.handleInputPress.bind(this);
        this.handleInputRelease = this.handleInputRelease.bind(this);
    }

    //Auto focus
    componentDidMount(){
        if(!this.props.disabled && this.props.autoFocus){
            this.input.focus();
        }
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        }, this.props.onChange(e.target.value));
    }

    handleFocus(e){
        if(this.props.disabled){
            this.input.blur();
        }else{
            this.setState({
                focused:true,
            });
            this.props.onFocus(e);
        }
    }

    handleBlur(e){
        this.setState({
            focused:false,
        });
        this.props.onBlur(e);
    }


    handleButtonClick(){
        this.props.onSearch(this.state.value);
    }

    handlePress(){
        this.setState({
           pressed:true
        });
    }
    handleRelease(){
        this.setState({
            pressed:false
        });
    }
    handleInputPress(){
        this.setState({
            inputPressed:true
        });
    }
    handleInputRelease(){
        this.setState({
            inputPressed:false
        });
    }


    render(){
        const styles = getStyle(this.props, this.context);
        return (
            <div
                className={this.props.className}
                style={Object.assign({}, styles.searchBar, this.props.style)}
            >
                <input
                    name={this.props.name}
                    ref={(ref) => this.input = ref}
                    type={this.props.type}
                    placeholder={this.props.hintText}
                    className={this.props.inputClassName}
                    value={this.state.value}
                    onChange={this.handleChange}
                    readOnly={this.props.disabled}
                    style={Object.assign({},styles.inputBase,
                        (this.state.inputPressed) ? styles.inputBasePressed:{},
                        (this.state.focused) ? styles.inputBaseFocus:{},
                        this.props.inputStyle)}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onMouseDown={this.handleInputPress}
                    onMouseUp={this.handleInputRelease}
                    onMouseLeave={this.handleInputRelease}
                />
                <button
                    name='searchBtn'
                    ref={(ref) => this.button = ref}
                    onClick={this.handleButtonClick}
                    className={this.props.btnClassName}
                    style={Object.assign({}, styles.searchButton,
                        (this.state.pressed) ? styles.searchButtonPressed : {} ,
                        (this.props.disabled) ? styles.searchButtonDisabled : {},
                        this.props.btnStyle ) }
                    disabled={this.props.disabled}
                    onMouseDown={this.handlePress}
                    onMouseUp={this.handleRelease}
                    onMouseLeave={this.handleRelease}
                >
                    <MagGlass
                        style={Object.assign({}, styles.icon, (this.state.pressed) ? styles.iconPressed : {})}
                        fill='#000000'
                        viewBox='-2 -2 24 24'
                    />
                </button>
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {string} defaultValue - initial value
     * @property {bool} disabled - disable/enable status
     * - default value `false`
     * @property {string} hintText - placeholder
     * @property {object} inputStyle - input tag style
     * @property {func} onChange - change event handler
     * @property {func} onBlur - blur change event handler
     * @property {bool} autoFocus - autoFocus status
     * - default value `false`
     * @property {object} style - wrapper style
     * @property {func} onSearch - search button click event handler
     */
    static get propTypes() {
        return {
            defaultValue : React.PropTypes.any,
            disabled : React.PropTypes.bool,
            hintText : React.PropTypes.string,
            inputStyle : React.PropTypes.object,
            buttonStyle : React.PropTypes.object,
            style : React.PropTypes.object,
            autoFocus : React.PropTypes.bool,
            onSearch : React.PropTypes.func,
        };
    }


    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}
SearchBar.obgName = 'SearchBar';
SearchBar.defaultProps = {
    className:'',
    inputClassName:'',
    btnClassName:'',
    defaultValue: '',
    disabled : false,
    onChange : function(){},
    type : 'text',
    autoFocus : false,
    onFocus : function(){},
    onBlur : function(){},
    onSearch:function(){},
};

export default injectObgCom(SearchBar);

