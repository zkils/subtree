
import React from 'react';

function getStyle(props, context) {
    var _obgTheme = context.obgTheme;
    var baseTheme = _obgTheme.baseTheme;
    var icon = _obgTheme.imgIcon;
    return {
        icon : {
            position: 'relative',
            zIndex: '1',
            margin: '0 auto',
            display: 'table',
            width: icon.iconSize + 'px',
            height: icon.iconSize + 'px',
        },
        iconImg:{
            width: '100%',
            height: '100%',
            border: '0',
            verticalAlign: 'middle',
            outline: 'none',
        }
    };
}

/**
 * ImgIcon Component
 * @extends React.Component
 * @example
 * import MenuImg from 'obgComponents/ImgIcon/Menu';
 *
 * <ImgIcon
 *  imgClass={'imgclass'} //set image background by class
 * />
 */
class ImgIcon extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const styles = getStyle(this.props, this.context);
        return (
            <div
                className={this.props.className}
                style={Object.assign({}, styles.icon, this.props.style)}
                onClick={this.props.onClick}
            >
                <div className={ this.props.imgClass} style={styles.iconImg} />
            </div>
        );
    }

    static get contextTypes() {
        return {
            obgTheme:React.PropTypes.object,
        };
    }


}



/**
 * set Default props
 * @type {{onClick: SvgIcon.defaultProps.onClick, viewBox: string}}
 */
ImgIcon.defaultProps = {
    className:'',
    onClick: function onClick() {},
};
ImgIcon.obgName = 'ImgIcon';

export default ImgIcon;