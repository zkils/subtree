
import React from 'react';
import SvgIcon from './SvgIcon';


class RemoveCircle extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <SvgIcon
                className={this.props.className}
                viewBox={this.props.viewBox}
                style={this.props.style}
            >
                <path xmlns='http://www.w3.org/2000/svg' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z'/>
            </SvgIcon>
        );
    }


}

export default RemoveCircle;
