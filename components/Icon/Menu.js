
import React from 'react';
import SvgIcon from './SvgIcon';


class Menu extends React.Component{

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
                <path xmlns='http://www.w3.org/2000/svg' d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' fill={this.props.fill || '#ffffff'}/>
            </SvgIcon>
        );
    }


}

export default Menu;
