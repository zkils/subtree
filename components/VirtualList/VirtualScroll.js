import React from "react";
import utils from "./utils";
import ReactDOM from "react-dom";



class VirtualScroll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items,
            bufferStart: 0,
            height: this.props.itemHeight,
            isMount : true,
        };

        this.onScroll = this.onScroll.bind(this);
    }

    getVirtualState(props) {
        // default values
        let state = {
            items: [],
            bufferStart: 0,
            height: 30
        };
        
        // early return if nothing to render
        
        if (props.items.length === 0 || props.itemHeight <= 0 || !this.state.isMount) return state;
        
        let items = props.items;
        
        state.height = props.items.length * props.itemHeight;
        //state.container = this.state.container

        let viewBox = this.viewBox();
        
        // no space to render
        if (viewBox.height <= 0) return state;
        
        viewBox.top = utils.viewTop(this.container);
        viewBox.bottom = viewBox.top + viewBox.height;
        
        let listBox = this.listBox(props);

        let renderStats = VirtualScroll.getItems(viewBox, listBox, props.itemHeight, items.length, props.itemBuffer);
        
        // no items to render
        if (renderStats.itemsInView.length === 0) return state;

        state.items = items.slice(renderStats.firstItemIndex, renderStats.lastItemIndex + 1);
        state.bufferStart = renderStats.firstItemIndex * props.itemHeight;
        
        return state;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.bufferStart !== nextState.bufferStart) return true;

        if (this.state.height !== nextState.height) return true;
        
        let equal = utils.areArraysEqual(this.state.items, nextState.items);
        
        return !equal;
    }
    viewBox() {
        return (this.view = this.view || this._getViewBox());
    }
    _getViewBox() {
        return {
            height: typeof this.container.innerHeight !== 'undefined' ? this.container.innerHeight : this.container.clientHeight
        };
    }
    _getListBox(nextProps) {
        //let list = this.getDOMNode();
        let list = ReactDOM.findDOMNode(this);

        let top = utils.topDifference(list, this.container);
        
        let height = nextProps.itemHeight * nextProps.items.length;
        
        return {

            top: top,
            height: height,
            bottom: top + height
        };
    }
    listBox(nextProps) {
        return (this.list = this.list || this._getListBox(nextProps));
    }
    componentWillReceiveProps(nextProps) {
        // clear caches
        this.view = this.list = null;

        let state = this.getVirtualState(nextProps);

        this.container.removeEventListener('scroll', this.onScrollDebounced);

        this.onScrollDebounced = utils.debounce(this.onScroll, nextProps.scrollDelay, false);
        
        this.container.addEventListener('scroll', this.onScrollDebounced);

        this.setState(state);
    }
    componentWillMount(){
        this.onScrollDebounced = utils.debounce(this.onScroll, this.props.scrollDelay, false);
    }
    componentDidMount() {
        console.log("-------didMount");
        
        this.container = ReactDOM.findDOMNode(this).parentNode;
        this.setState({
            isMount : true,
        });
        let state = this.getVirtualState(this.props);
        
        this.setState(state);
        
        this.container.addEventListener('scroll', this.onScrollDebounced);
    }
    componentWillUnmount() {
        this.container.removeEventListener('scroll', this.onScrollDebounced);
        
        this.view = this.list = null;
        this.setState({
            isMount : false
        });
    }
    onScroll() {
        console.log("Scroll");
        let state = this.getVirtualState(this.props);
        
        this.setState(state);
    }
    // in case you need to get the currently visible items
    visibleItems() {
        return this.state.items;
    }
    render() {
        return (
            <this.props.tagName {...this.props} style={{boxSizing: 'border-box', height: this.state.height, paddingTop: this.state.bufferStart }} >
                {this.state.items.map(this.props.renderItem)}
            </this.props.tagName>
        );
    }
    static get propTypes() {
        return {
            items: React.PropTypes.array.isRequired,
            itemHeight: React.PropTypes.number.isRequired,
            renderItem: React.PropTypes.func.isRequired,
            tagName: React.PropTypes.string,
            scrollDelay: React.PropTypes.number,
            itemBuffer: React.PropTypes.number
        };
    }
}
VirtualScroll.defaultProps={
        tagName: 'div',
        scrollDelay: 0,
        itemBuffer: 0
};

VirtualScroll.getBox = function getBox(view, list) {
    list.height = list.height || list.bottom - list.top;
    
    return {
        top: Math.max(0, Math.min(view.top - list.top)),
        bottom: Math.max(0, Math.min(list.height, view.bottom - list.top))
    };
};

VirtualScroll.getItems = function(viewBox, listBox, itemHeight, itemCount, itemBuffer) {
    if (itemCount === 0 || itemHeight === 0) return {
        itemsInView: 0
    };
    
    // list is below viewport
    if (viewBox.bottom < listBox.top) return {
        itemsInView: 0
    };
    
    // list is above viewport
    if (viewBox.top > listBox.bottom) return {
        itemsInView: 0
    };
    
    let listViewBox = VirtualScroll.getBox(viewBox, listBox);
    
    let firstItemIndex = Math.max(0,  Math.floor(listViewBox.top / itemHeight) - itemBuffer);
    let lastItemIndex = Math.min(itemCount, Math.ceil(listViewBox.bottom / itemHeight) + itemBuffer) - 1;
    
    let itemsInView = lastItemIndex - firstItemIndex + 1;

    let result = {
        firstItemIndex: firstItemIndex,
        lastItemIndex: lastItemIndex,
        itemsInView: itemsInView,
    };
    
    return result;
};
export default  VirtualScroll;
