
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class Pause extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Pause}
                style={this.props.style}
            />
        );
    }


}

export default Pause;
