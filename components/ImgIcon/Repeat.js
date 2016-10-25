
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class Repeat extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Repeat}
                style={this.props.style}
            />
        );
    }


}

export default Repeat;
