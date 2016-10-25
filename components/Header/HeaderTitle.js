import React from 'react';
import injectObgCom from "../Common/injectObgCom"; 

/**
 * HeaderTitle Component
 * @extends React.Component *
 * @example
 * <HeaderTitle> Header title text </HeaderTitle>
 */
function getStyle(){
    return{
        titleColumn:{
            marginLeft:"3px",
            marginRight:"3px",
            height:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flex : 1
            
        }

    };
}
class HeaderTitle extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const styles = getStyle();
        const {
            style,
            ...other
        } = this.props;
        
        return (
            <div {...other} style={Object.assign({}, styles.titleColumn, style)}>
                {this.props.children}
            </div>
        );
    }
    static get propTypes() {
        return {
        };
    }
}

HeaderTitle.obgName = 'HeaderTitle';
HeaderTitle.defaultProps ={
};

export default injectObgCom(HeaderTitle);
