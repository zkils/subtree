import React from 'react';
import ReactDom from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import injectObgCom from "../Common/injectObgCom";

/**
 * Tab Component
 * @extends React.Component
 * @example
 * <Tab enable={true} onClick={func} />
 *
 */
class Tab extends React.Component{

    /**
     * Constructor function
     * @constructor
     * @param {Object} props
     */
    constructor(props){
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }




    /**
     * Render nodes
     * @returns {XML} JSX syntax.
     */
    render(){
        return (
            <div >
                {this.props.children}
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} show            - Property for component show/hide.
     */
    static get propTypes() {
        return {
            show: React.PropTypes.bool,
        };
    }

}
Tab.obgName = 'Tab';
Tab.defaultProps = {
};

export default injectObgCom(Tab);
