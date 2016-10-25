
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class Menu extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Menu}
                style={this.props.style}
            />
        );
    }


}

export default Menu;
