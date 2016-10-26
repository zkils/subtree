/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import injectObgCom from '../Common/injectObgCom';
import Handle from './Handle';
import SideItem from './SideItem';
import Tip from './Tip';


function getStyle(props, context) {
    let _obgTheme = context.obgTheme;
    let baseTheme = _obgTheme.baseTheme;
    let slider = _obgTheme.slider;
    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            margin: '10px',
        },
        wrapperVertical:{
            textAlign: 'center',
            minWidth:'50px',
            maxWidth: '100px',
            display:'block',
            position: 'relative',
        },
        barBase:{
            margin: '0 10px 0 10px',
            display: 'inline-block',
            position: 'relative',
            background: slider.trackColor,
            width: '100%',
            minHeight: '10px',
            height:'15px',
        },
        barBaseVertical:{
            height: '70%',
            minWidth: '10px',
            maxWidth: '100px',
            width: '15px',
        },
        barFragment: {
            position: 'absolute',
            display: 'block',
            height: '100%',
            background: slider.trackColorSelected,
            width: '0%',
        },
        barFragmentVertical:{
            width: '100%',
            height: '0%',
            bottom: '0px',
        },
    };
}


/**
 * Slider Component
 * @example
 * <Slider
 *     initialPos={30} // percent
 *     orientation={'horizontal'}
 *     handleType={'rect'}
 *     tip = {true}
 *     min = {0}
 *     max = {100}
 *     type = {'text'}
 * >
 * </Slider>
 */

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPos: this.props.initialPos,
            handlePos: 0,
            dragStart: false,
            isTipShow: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.increasePos = this.increasePos.bind(this);
        this.decreasePos = this.decreasePos.bind(this);
        this.calcHandlePosition = this.calcHandlePosition.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.showTip = this.showTip.bind(this);
    }

    componentWillMount() {
        this.convertedStep = Math.round(this.props.step / this.props.max * 100, 1); //TODO step은 %단위? 수치?
        this.containerRect = null;

    }

    componentDidMount() {
        this.containerRect = this.refs.container.getBoundingClientRect();
        this.calcHandlePosition();
    }

    calcHandlePosition(e) {
        const barFragment = this.refs.container.lastChild,
            barFragmentRect = barFragment.getBoundingClientRect(),
            handle = ReactDOM.findDOMNode(this.refs.handle),
            handleRect = handle.getBoundingClientRect(),
            lastElement = ReactDOM.findDOMNode(this.refs.afterElement),
            lastElRect = lastElement.getBoundingClientRect();

        let newHandlePos;
        if (this.props.orientation == 'horizontal') {
            newHandlePos = barFragmentRect.right - handleRect.width / 2;
        } else {
            if (lastElRect.height > 0) {
                newHandlePos = lastElRect.bottom - barFragmentRect.bottom + barFragmentRect.height - handleRect.height / 2; //vertical
                (this.props.type == 'icon') ? newHandlePos -= lastElRect.height : newHandlePos -= 17;
            }
            else {
                // newHandlePos = lastElRect.bottom - barFragmentRect.bottom + barFragmentRect.height - handleRect.height / 2; //vertical
                // newHandlePos+=50;
                newHandlePos = barFragmentRect.height - handleRect.height / 2;
            }
        }

        this.setState({
            handlePos: newHandlePos
        });
    }

    updatePosition(e) {
        let rect = this.refs.container.getBoundingClientRect(),
            ratio,
            newPos;
        if (this.props.orientation == 'horizontal') {
            ratio = (e.pageX - rect.left) / rect.width;
            ratio = this.checkRatio(ratio);
            newPos = 100 * ratio;
        } else {
            //ratio = (e.pageY - rect.top) / rect.height;
            ratio = (e.clientY - rect.top) / rect.height;
            ratio = this.checkRatio(ratio);
            newPos = 100 - (100 * ratio);
        }
        this.setState({
            currentPos: newPos
        }, this.calcHandlePosition);
    }

    checkRatio(ratio) {
        let newRatio = ratio;
        if (ratio > 1) newRatio = 1;
        if (ratio < 0) newRatio = 0;
        return newRatio;
    }

    handleClick(e) {
        this.updatePosition(e);
        this.showTip(true);
        this.tipTimer = setTimeout(()=> {
            this.showTip(false);
        }, 500);
    }

    clearTipTimer() {
        clearTimeout(this.tipTimer);
    }

    handleIconClick(e) {
        let newPos;
        if (this.props.type == 'icon') {
            if (e.currentTarget == ReactDOM.findDOMNode(this.refs.beforeElement)) {
                if (this.props.orientation == 'vertical') {
                    this.increasePos(this.convertedStep);
                } else {
                    this.decreasePos(this.convertedStep);
                }
            } else {
                if (this.props.orientation == 'vertical') {
                    this.decreasePos(this.convertedStep);
                } else {
                    this.increasePos(this.convertedStep);
                }
            }
        }
    }

    increasePos(step) {
        let newPos = this.state.currentPos + step;
        this.setState({
            currentPos: (newPos >= 100) ? 100 : newPos,
        }, this.calcHandlePosition);
    }

    decreasePos(step) {
        let newPos = this.state.currentPos - this.convertedStep;
        this.setState({
            currentPos: (newPos <= 0) ? 0 : newPos,
        }, this.calcHandlePosition);
    }

    pauseEvent(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    handleDragStart(e) {
        this.setState({
            dragStart: true,
        });
        this.clearTipTimer();
        this.addDocumentEvents();
        this.showTip(true);

        this.pauseEvent(e);
    }

    onMouseMove(e) {
        this.updatePosition(e);
    }

    dragEnd(e) {
        this.setState({
            dragStart: false,
        });
        this.showTip(false);
        this.pauseEvent(e);
        this.removeEvents();
    }

    addDocumentEvents() {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.dragEnd);
    }

    removeEvents() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.dragEnd);
    }

    showTip(flag) {
        if (this.props.tip) {
            this.setState({
                isTipShow: flag,
            });
        }
    }


    render() {
        const {
            show,
            pushElement,
            ...props,
        } = this.props;

        const styles = getStyle(this.props, this.context);
        const sizeStyle = (this.props.orientation == 'vertical') ? {height: (this.props.defaultSize / 2) + 'px'} : {width: this.props.defaultSize + 'px'};
        const barBaseStyle = (this.props.orientation == 'vertical' && this.props.type == 'text' && !this.props.headItem && !this.props.headItem ) ? {height: '100%'} : {};

        return (
            <div
                className={this.props.className}
                style={Object.assign({}, styles.wrapper, (this.props.orientation == 'vertical') ? styles.wrapperVertical : {}, sizeStyle, this.props.style)}
            >
                <SideItem
                    {...this.props}
                    name='beforeElement'
                    onClick={this.handleIconClick}
                    currentTimePos={this.state.currentPos}
                    ref='beforeElement'
                />
                <div
                    className={this.props.barClass}
                    onClick={this.handleClick}
                    style={Object.assign({},styles.barBase, this.props.orientation == 'vertical' ? styles.barBaseVertical : {}, this,barBaseStyle, this.props.barStyle)}
                    ref='container'
                >
                    <div
                        className={this.props.barFragmentClass}
                        style={Object.assign({},
                            styles.barFragment,
                            this.props.orientation == 'vertical' ? styles.barFragmentVertical : {},
                            (this.props.orientation == 'horizontal') ? {width: this.state.currentPos + '%'} : {height: this.state.currentPos + '%'},
                            this.props.barFragmentStyle
                        )}
                    />
                </div>

                <Handle
                    onMouseDown={this.handleDragStart}
                    position={this.state.handlePos}
                    handleType={this.props.handleType}
                    orientation={this.props.orientation}
                    dragStart={this.state.dragStart}
                    ref='handle'
                />

                <Tip
                    type={this.props.type}
                    show={this.state.isTipShow}
                    orientation={this.props.orientation}
                    position={this.state.handlePos}
                    ratio={this.state.currentPos}
                    max={this.props.max}
                />

                <SideItem
                    {...this.props}
                    name='afterElement'
                    onClick={this.handleIconClick}
                    currentTimePos={this.state.currentPos}
                    ref='afterElement'
                />
            </div>
        );
    }

    /**
     * propTypes form parent Component
     * @property {number} defaultSize - total width or height
     * - default value `500`px
     * @property {string} orientation - horizontal / vertical
     * - default value `horizontal`
     * @property {string} handleType - circle / rect
     * - default value `circle`
     * @property {number} initialPos - handle and bar position
     * - default value `0`
     * @property {number} step
     * - default value `10`
     * @property {bool} tip - tip show/hide when handle dragging
     * - default value `true`
     * @property {number} min
     * - default value `0`
     * @property {number} max
     * - default value `0`
     * @property {string} type -  4 type
     * - default value `text`
     * - {'text', 'time', 'number','icon'}
     * @property {object} headItem - set when type is Icon or text
     * @property {object} footItem - set when type is Icon or text
     */
    static get propTypes() {
        return {
            defaultSize: React.PropTypes.number,
            orientation: React.PropTypes.string,
            handleType: React.PropTypes.string,
            initialPos: React.PropTypes.number,
            step: React.PropTypes.number,
            tip: React.PropTypes.bool,
            min: React.PropTypes.number,
            max: React.PropTypes.number,
            type: React.PropTypes.string,
            headItem: React.PropTypes.object,
            footItem: React.PropTypes.object,
        };
    }

    static get contextTypes() {
        return {
            obgTheme: React.PropTypes.object,
        };
    }
}
Slider.obgName = 'Slider';
Slider.defaultProps = {
    defaultSize: 500,
    orientation: 'horizontal',
    handleType: 'circle',
    barFragmentStyle:{},
    barStyle:{},
    onChangeMin: ()=> {
    },
    onChangeMax: ()=> {
    },
    initialPos: 0,
    step: 10,
    tip: true,
    min: 0,
    max: 100,
    type: 'text',
};

export default injectObgCom(Slider);