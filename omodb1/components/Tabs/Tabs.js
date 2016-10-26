import React, {Children, PropTypes} from 'react';
import injectObgCom from "../Common/injectObgCom";
import AbstractButton from "../private/AbstractButton/AbstractButton";

/**
 * Tabs Container
 * @extends React.Component *
 * @example
 * <Tabs >
 *      <tab label="hello" >
 *      </tab>
 *      <tab label="hello2" >
 *      </tab>
 * </Tabs>
 */




function getStyle(context){
    const {obgTheme}  =  context;
    const {baseTheme, tab} = obgTheme;

    return {
        Tabs:{
            minHeight:"200px"
        },
        Tabs_verti : {
            display:"flex"
        },
        TabsContentLayout:{
            width:"100%",
            height:"auto"
        },
        TabTitle: {

            backgroundColor:"transparent",
            border:"none",
            outline:"none",
            color:tab.titleTextColor,
            height:"54px",
            fontSize:"28pt",
            WebkitUserSelect: "none",
            paddingLeft:"1px",
            paddingRight:"1px",
            verticalAlign:"middle",
            position:"relative"
        },
        tabBtnArea: {
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        },
        TabTitle_selected: {
            color:tab.selectedTitleTextColor
        },
        tabLabelArea :{
            display:"flex",
            height:"54px",
            width:"100%",
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
        tabBtnArea_span:{
            display:"block",
            width:"100%",
            height:"4px",
            backgroundColor:tab.underbarColor,
        },
        TabTitle_selected_span:{
            backgroundColor:tab.selectedUnderbarColor
        },
        TabTitle_active:{
            color:tab.pressedTitleTextColor
        },
        TabContent:{
            margin:"20px 20px"
        },
        hori_TabsHeaderLayout:{
            width:"100%",
            height:"58px"
        },
        verti_TabsHeaderLayout:{
            width:"30%",
            minWidth:"200px",
            borderBottom:"none"
        },
        verti_TabsHeaderLayout_TabTitle:{
            width:"100%",
            height:"70px"
        }

    };
}
class Tabs extends React.Component{


    constructor(props){
        super(props);
        this.state={
            selectedIdx : this.props.selectedIdx
        };
        this.changeTab = this.changeTab.bind(this);


    }




    changeTab(idx){
        this.setState({
            selectedIdx: idx
        });
    }

    render(){
        const styles = getStyle(this.context);
        let tabs = [];
        let tabContents = [];


        tabs = Children.map(this.props.children, (tab, idx)=>{
            if(tab.type.obgName != 'Tab'){
               throw new Error("Tabs can only has Tab component.");    
            }
            let inlineStyle = {
                width:(100/this.props.children.length)+"%"
            };
            let underlineStyle = styles.tabBtnArea_span; 
            let pressedStyle = {};
            
            let tabTitle = {};
            if(this.props.vertical){
                tabTitle = Object.assign({}, styles.TabTitle, styles.verti_TabsHeaderLayout_TabTitle);
            }else{
                tabTitle = Object.assign({}, styles.TabTitle);
            }


            if(idx == this.state.selectedIdx){
                inlineStyle = Object.assign(inlineStyle, tabTitle, styles.TabTitle_selected);
                underlineStyle = Object.assign({}, underlineStyle, styles.TabTitle_selected_span);
            }else{
                inlineStyle = Object.assign(inlineStyle, tabTitle);
                pressedStyle = Object.assign({}, styles.TabTitle_active);
            }
            console.log(inlineStyle);
            
            return (
                <AbstractButton onClick={()=>this.changeTab(idx)} buttonStyle={Object.assign({}, inlineStyle, tab.props.style)} key={idx} pressedStyle={pressedStyle} className={tab.props.className} >
                <div style={styles.tabBtnArea}>
                    <div style={styles.tabLabelArea} >
                        <div>{tab.props.label}</div>
                    </div>
                    <span style={underlineStyle}></span>
                </div>
                </AbstractButton>
            );

        });

        tabContents = Children.map(this.props.children, ((content, idx)=>{
            if(this.state.selectedIdx  != idx){
                return;     //avoid unnecessary render
            }else{ 
                return (
                    <div style={styles.TabContent} key={idx} >
                        {content}
                    </div>
                );
            }
        }));
        
        let tabsStyle = {};
        let tabsHeaderStyle = {};
        





        if(this.props.vertical){
            tabsStyle = Object.assign({}, styles.Tabs, styles.Tabs_verti, this.props.style);
            tabsHeaderStyle = Object.assign({}, styles.verti_TabsHeaderLayout);
        }else{
            tabsStyle = Object.assign({}, styles.Tabs, styles.hori, this.props.style);
            tabsHeaderStyle = Object.assign({}, styles.hori_TabsHeaderLayout);
        }


        return (

            <div style={tabsStyle} className={this.props.className} >
                <div style={tabsHeaderStyle} >
                    {tabs}
                </div>
                <div style={styles.TabsContentLayout}>
                    {tabContents}
                </div>
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} show            - Property for component show/hide.
     * @property {number} selectedIdx   - Initial selected tab index.
     * @property {object} style         - Style for component.
     *
     */
    static get propTypes() {
        return {
            show : React.PropTypes.bool,
            style : React.PropTypes.object,
            selectedIdx : React.PropTypes.number
        };
    }
    static get contextTypes(){
        return {
            obgTheme:React.PropTypes.object,
        };
    }
}

Tabs.defaultProps ={
    style : {},
    selectedIdx : 0
};

export default injectObgCom(Tabs);




