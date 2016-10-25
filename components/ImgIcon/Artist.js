
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class Artist extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Artist}
                style={this.props.style}
            />
        );
    }


}

export default Artist;
