import React from 'react';


function getStyle(props, context) {
    var _obgTheme = context.obgTheme;
    var baseTheme = _obgTheme.baseTheme;
    var icon = _obgTheme.icon;
    return {
        icon : {
            display: 'inline-block',
            height: icon.iconSize+'px',
            width: icon.iconSize+'px',
            margin: icon.iconSpacing+'px',
        },
    };
}

/**
 * SvgIcon Component
 * 24x24 is default size
 * @extends React.Component
 * @example
 * import SvgIcon from 'obgComponents/Icon/SvgIcon';
 *
 * <SvgIcon>
 *     <path d="svg string"></path>
 * </SvgIcon>
 */
class SvgIcon extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const styles = getStyle(this.props, this.context);
        return (
            <svg
                className={this.props.className}
                style={Object.assign({}, styles.icon, this.props.style)}
                onClick={this.props.onClick}
                viewBox={this.props.viewBox}
            >
                {this.props.children}
            </svg>
        );
    }

    /**
     * propTypes form parent Component
     * @property {func} onClick onclick event cb
     * @property {string} icon viewbox
     */
    static get propTypes() {
        return {
            viewBox : React.PropTypes.string,
            onClick : React.PropTypes.func,
        };
    }
    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

SvgIcon.obgName = 'SvgIcon';
SvgIcon.defaultProps = {
    className:'',
    onClick: function onClick() {},
    viewBox: '0 0 24 24'
};


export default SvgIcon;