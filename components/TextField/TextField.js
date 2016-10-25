import React from 'react';

function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let textField = _obgTheme.textField;
    return {
        textField: {
            width: '400px',
            height: '60px',
            padding: '0 24px 3px',
            backgroundColor:  textField.backgroundColor,
            border: '5px solid ' + textField.borderColor,
            fontSize: textField.inputFontSize+'px',
            color: textField.textColor,
            boxSizing: 'border-Box',
        },
        textarea: {
            resize: 'none',
            padding: '0 24px 3px',
            backgroundColor: textField.backgroundColor,
            border: '5px solid ' + textField.borderColor,
            fontSize: textField.inputFontSize+'px',
            color: textField.textColor,
            boxSizing: 'border-Box',
        },
        inputPressed:{
            backgroundColor:textField.pressedBackgroundColor,
            color:textField.pressedTextColor,
        },
        inputFocused:{
            outline: 'none',
            border: '5px solid ' + textField.focusBorderColor,
        },
        wrapper: {
            position: 'relative',
        },

    };
}

/**
 * TextField Component
 * @example
 * <TextField
 *  defaultVale='TextField'
 *  hintText='HintText'
 * />
 */
class TextField extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value:this.props.defaultValue,
            focused:false,
            pressed:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handlePressed = this.handlePressed.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }

    /**
     * propTypes form parent Component
     * @property {string} className - class for textfield
     * @property {string} defaultValue - initial value
     * @property {bool} disabled - disable status
     * - default value `false`
     * @property {string} hintText - placeholder
     * @property {object} inputStyle - input tag style
     * @property {string} multiLine - multiline option
     * - default value `false`
     * @property {func} onChange - change event handler
     * @property {func} onBlur - blur event handler
     * @property {func} onFocus - focus event handler
     * @property {number} rows - multiline type option
     * @property {number} rowsMax - multiline type option
     * - default value `3`
     * @property {number} cols - multiline type option
     * - default value `20`
     * @property {object} style - textfile inline style
     * @property {object} textareaStyle - textarea inline style
     * @property {string} type -  input tag type
     * - default value `text`
     */
    static get propTypes() {
        return {
            className : React.PropTypes.string,
            defaultValue : React.PropTypes.any,
            disabled : React.PropTypes.bool,
            hintText : React.PropTypes.string,
            inputStyle : React.PropTypes.object,
            multiLine : React.PropTypes.bool,
            onChange : React.PropTypes.func,
            onBlur : React.PropTypes.func,
            onFocus : React.PropTypes.func,
            rows : React.PropTypes.number,
            rowsMax : React.PropTypes.number,
            cols : React.PropTypes.number,
            style : React.PropTypes.object,
            textareaStyle : React.PropTypes.object,
            type : React.PropTypes.string,
        };
    }

    handleChange(e){
        let numberOfLines;
        if(this.props.multiLine){
            numberOfLines = (e.target.value.match(/\n/g) || []).length + 1;
            if(this.props.rowsMax < numberOfLines) {
                return false;
            }else{
                this.setState({
                    value: e.target.value
                },this.props.onChange(e.target.value));
            }
        }else{
            this.setState({
                value: e.target.value
            },this.props.onChange(e.target.value));
        }
    }

    handleFocus(e){
        this.props.onFocus(e);
        this.setState({
            focused:true,
        });
    }

    handleBlur(e){
        this.props.onBlur(e);
        this.setState({
            focused:false,
        });
    }
    handlePressed(){
        this.setState({
            pressed:true,
        });
    }
    handleRelease(){
        this.setState({
            pressed:false,
        });
    }


    render(){
        const styles = getStyle(this.props, this.context);
        let inputDOM;
        if(this.props.multiLine){
            inputDOM = <textarea
                name={this.props.name}
                readOnly={this.props.disabled}
                placeholder={this.props.hintText}
                style={Object.assign({},
                    styles.textarea,
                    (this.state.focused) ? styles.inputFocused : {} ,
                    (this.state.pressed) ? styles.inputPressed : {} ,
                     this.props.textareaStyle)}
                className={this.props.className}
                value={this.state.value}
                rows={this.props.rows}
                cols={this.props.cols}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onMouseDown={this.handlePressed}
                onMouseLeave={this.handleRelease}
                onMouseUp={this.handleRelease}
                />;
        }else{
            inputDOM = <input
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.hintText}
                className={this.props.className}
                value={this.state.value}
                readOnly={this.props.disabled}
                style={Object.assign({},
                    styles.textField,
                    (this.state.focused) ? styles.inputFocused : {} ,
                    (this.state.pressed) ? styles.inputPressed : {} ,
                     this.props.inputStyle)}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseDown={this.handlePressed}
                onMouseLeave={this.handleRelease}
                onMouseUp={this.handleRelease}
            />;
        }
        return (
            <div
                style={styles.wrapper}
            >
                {inputDOM}
            </div>
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }

}
TextField.obgName = 'TextField';
TextField.defaultProps = {
    className:"",
    defaultValue: "",
    rowsMax:3,
    cols:20,
    disabled : false,
    multiLine : false,
    onChange : function(){  },
    type : 'text',
    onFocus : function(){},
    onBlur : function(){},
};

export default TextField;

