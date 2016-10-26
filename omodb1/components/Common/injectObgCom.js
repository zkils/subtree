
import React, {Component} from 'react';
import classNames from 'classnames/bind';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

/**
 * HOC from obgModule
 * @module HOC:obgModule
 * @extends React.Component
 * @example
 * import injectObgCom from "../Common/injectObgCom";
 * class Sample ... {
 *  this.props.pushElement(children,element, baseStyles, baseClassName, additionalProps);
 * }
 * export default injectObgCom(Sample);
 *
 * <Sample show={true} />
 *
 *
 */
export default function injectObgCom(WrappedComponent) {


    class InjectObgCom extends Component {
        constructor(props, context) {
            super(props, context);
        }

        getWrappedInstance() {
            return this.refs.wrappedInstance;
        }

        /**
         * Push ChildElement
         * It supports that inject props to children
         * @memberOf HOC:obgModule
         * @param {array} children for push
         * @param {object} element - based React element
         * @param {object} baseStyles  - new styles for new element
         * @param {string} baseClassName - new classname for new element
         * @param {object} additionalProps - {...props}
         * @example
         * let contentChildren = [this.props.children];
         *  this.pushElement(contentChildren, <font>{this.props.text}</font>, {}, styles.Text);
         *
         *  render(){
         *      return (
         *          {contentChildren}
         *      );
         *  }
         */
        pushElement(children, element, baseStyles, baseClassName, additionalProps) {
            if (element) {
                let styles = Object.assign({}, baseStyles, element.props.style);
                let className = classNames(element.props.className, baseClassName);
                children.push(React.cloneElement(element, Object.assign({
                    key: children.length,
                    style: styles,
                    className : className
                }, additionalProps)));
            }
        }

        render() {
            if(this.props.show){
                return (
                    <WrappedComponent
                        {...Object.assign({},this.props,{pushElement:this.pushElement})}
                        {...this.context}
                    />
                );
            }else{
                return (
                    <div />
                );
            }

        }
    }

    InjectObgCom.obgName= WrappedComponent.obgName;

    InjectObgCom.contextTypes = {
    };
    InjectObgCom.defaultProps = {
        show:true,
    };

    InjectObgCom.WrappedComponent = WrappedComponent;

    return InjectObgCom;
}
