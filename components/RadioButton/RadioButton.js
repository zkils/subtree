import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from '../Common/injectObgCom';


function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let radioButton = _obgTheme.radioButton;
    return {
        radioButton : {
            margin: radioButton.margin+'px',
            overflow: 'auto',
            padding: radioButton.padding+'px',
        },
    };
}

/**
 * RadioButton Component
 * @extends React.Component
 * @example
 * <RadioButton>
 *     <RadioButtonItem selected={true} text={'First'} />
 *     <RadioButtonItem leftIcon={LeftIcon} text={'Second'} />
 *     <RadioButtonItem rightIcon={RightIcon} text={'Third'} />
 * </RadioButton>
 */
class RadioButton extends React.Component{

    constructor(props){
        super(props);
        this.state={
            selectedIndex:this.props.selectedIndex,
        };
        this.handleClick = this.handleClick.bind(this);

    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selectedIdx!==this.state.selectedIdx){
            this.setState({
                selectedIdx : nextProps.selectedIdx
            });
        }
    }

    /**
     * Handle onSelected cb
     * pass to selected index to parent
     * @example
     * <RadioButton onClick={handleBackButton} />
     */
    handleClick(e,i){
        this.setState({
            selectedIndex:i,
        });
        this.props.onSelected(i);
    }


    render(){
        const styles = getStyle(this.props, this.context);
        return (
            <div
                className={this.props.className}
                style = {Object.assign({},styles.radioButton, this.props.style)}
            >
                {this.props.children.map((child,i) => React.cloneElement(child,
                    {
                        onClick:this.handleClick,
                        index:i,
                        selected:(i === this.state.selectedIndex),
                        horizontal: this.props.horizontal
                    }))
                }
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {number} default selected Index
     * - default value `0`
     * @property {func} onSelected return selected Item Index
     * @property {bool} true - horizontal / false - vertical
     * - default value `false`
     * @property {bool} true - remove background
     * - default value `false`
     */
    static get propTypes() {
        return {
            selectedIndex : React.PropTypes.number,
            onSelected: React.PropTypes.func,
            horizontal : React.PropTypes.bool,
            nonBackground : React.PropTypes.bool,
        };
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

RadioButton.obgName = 'RadioButton';
RadioButton.defaultProps = {
    selectedIndex : 0,
    onSelected : function(){},
    className:'',
    horizontal : false,
    nonBackground:false,
};

export default injectObgCom(RadioButton);
