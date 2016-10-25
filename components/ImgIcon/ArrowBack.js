
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';

class ArrowBack extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.ArrowBack}
                style={this.props.style}
            />
        );
    }


}

export default ArrowBack;
