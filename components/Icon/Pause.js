
import React from 'react';
import SvgIcon from './SvgIcon';


class Pause extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default Pause;
