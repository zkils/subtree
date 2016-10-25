import React, {Children} from 'react';

/**
 * Header Component
 * Header component children must be HeaderColumn or HeaderTitle component.
 * @extends React.Component *
 * @example
 * <Header>
 *  <HeaderColumn> column1 </HeaderColumn>
 *  <HeaderColumn> column2 </HeaderColumn>
 *  <HeaderTitle> title </HeaderTitle>
 *  <HeaderColumn> column3 </HeaderColumn>
 * </Header>
 */


function getStyle(prop, context){
    const {obgTheme}  =  context;
    const {baseTheme, header} = obgTheme;

    return {
        type1:{
            minWidth:"87px",
        },
        type2:{
            minWidth:"122px",
        },
        last:{
            minWidth:"144px"
        },
        HeaderLayer:{
            width:"100%",
            height: "57px",
            display:"flex",
            alignItems:"center",
            background:header.backgroundColor,
            fontSize:"28px"
        }
    };
}


class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        let isMeetTitle = false;

        const {
            style,
            ...other
        } = this.props;

        const childLen = Children.count(this.props.children);
        const styles = getStyle(this.props, this.context);
       
        const headerColumns = Children.map(this.props.children, (child, idx)=>{
            if(child.type.obgName != "HeaderColumn" &&  child.type.obgName != "HeaderTitle" ){
                throw new Error("Header can only has HeaderColumn or HeaderTitle component.");
            }
            
            if(child.type.obgName == "HeaderTitle"){
                isMeetTitle = true;
                return child;
            }else{
                if(isMeetTitle == false){
                    return React.cloneElement(child, {
                        style: styles.type1
                    });
                }else{
                    if(childLen-1 == idx){
                        return React.cloneElement(child, {
                            style: styles.last
                        });
                    }else{
                        return React.cloneElement(child, {
                            style: styles.type2
                        });
                    }
                }
            }

        });
        

        return (
            <div {...other} style={Object.assign({}, styles.HeaderLayer, style)} >
                {headerColumns}
            </div>
        );
    }
    /**
     * propTypes form parent Component
     * @property {object} style - Component style
     */
    static get propTypes() {
        return {
            style : React.PropTypes.object,
        };
    }
    static get contextTypes(){
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

Header.defaultProps ={
    style : {}
};

export default Header;
