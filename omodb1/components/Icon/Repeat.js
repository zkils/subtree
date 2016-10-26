
import React from 'react';
import SvgIcon from './SvgIcon';


class Repeat extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default Repeat;
