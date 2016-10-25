
import React from 'react';
import SvgIcon from './SvgIcon';


class PlayArrow extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M8 5v14l11-7z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default PlayArrow;
