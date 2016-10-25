
import React from 'react';
import SvgIcon from './SvgIcon';

class VolumeDown extends React.Component{

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
                <path d='M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z'  fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default VolumeDown;
