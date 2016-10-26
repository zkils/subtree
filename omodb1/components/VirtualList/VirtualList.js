import React from 'react';
/*
import styles from './VirtualList.css';
import classNames from 'classnames/bind';
*/
import shallowCompare from 'react-addons-shallow-compare';
import VirtualScroll from "./VirtualScroll";
import injectObgCom from "../Common/injectObgCom";

/**
 * VirtualList Component
 * @extends React.Component
 * @example
 * <VirtualList label={"label"} enable={true} onClick={func} />
 *
 * <VirtualList>
 *     <Icon>
 *     <span>
 * </VirtualList>
 */
class VirtualList extends React.Component{
    /**
     * 생성자
     * @param {Object} props
     */
    constructor(props){
        super(props);
        /**
         * @type {boolean}
         * @property {boolean} pressed button press status
         */
        
        let list = [];
        for(let i=0;i<1000;i++){
            list.push(i);
        }
        this.state={
            list : list
        };
        this.test = this.test.bind(this);
        this.renderFunc = this.renderFunc.bind(this);
    }

    /**
     * Check prop and state for performance
     * @param nextProps
     * @param nextState
     * @returns {bool}
     */
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }
    test(){
        console.log("tt");
    }
    renderFunc(item){
        let style={
            height:"30px" 
        };
        return (<div style={style} key={item} onTap={this.test}>{item}</div>);
    }

    /**
     * Render nodes
     * @returns {XML}
     */
    render(){
            
        let style={
            height:"390px",
            overflow:"scroll",
            color:"red"
        };
         
        let ele = (
            <div style={style} >
                <VirtualScroll items={this.state.list} itemHeight={30} renderItem={this.renderFunc} itemBuffer={8}/>
            </div>
        );

        return ele;
        
        
    }

    /**
     * propTypes form parent Component
     * @property {string} label button label
     * @property {bool} enable button status
     * @property {func} onClick onclick event cb
     */
    static get propTypes() {
        return {
            label : React.PropTypes.string,
            enable : React.PropTypes.bool,
            onClick : React.PropTypes.func,
        };
    }

}
VirtualList.defaultProps = {
    show:true,
};

export default injectObgCom(VirtualList);
