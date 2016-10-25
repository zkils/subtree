
import React from 'react';
import SvgIcon from './SvgIcon';

class ArrowBack extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default ArrowBack;
