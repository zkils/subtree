
import React from 'react';
import SvgIcon from './SvgIcon';

class SkipPrevious extends React.Component{
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
                <path xmlns='http://www.w3.org/2000/svg' d='M6 6h2v12H6zm3.5 6l8.5 6V6z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default SkipPrevious;
