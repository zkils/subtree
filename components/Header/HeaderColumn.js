import React from 'react';
import injectObgCom from "../Common/injectObgCom"; 

/**
 * HeaderColumn Component
 * @extends React.Component *
 * @example
 * <HeaderColumn> Column text or component</HeaderColumn>
 */
function getStyle(){
    return {
        headerColumn:{ 
            marginLeft:"3px",
            marginRight:"3px",
            height:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }
    };
}
class HeaderColumn extends React.Component{
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
            <div {...other} style={Object.assign({}, styles.headerColumn, style)} >
                {this.props.children}
            </div>
        );
    }
    static get propTypes() {
        return {
        };
    }
}
HeaderColumn.obgName = 'HeaderColumn';
HeaderColumn.defaultProps ={
};

export default injectObgCom(HeaderColumn);
