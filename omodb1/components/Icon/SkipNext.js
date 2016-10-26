
import React from 'react';
import SvgIcon from './SvgIcon';


class SkipNext extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default SkipNext;
