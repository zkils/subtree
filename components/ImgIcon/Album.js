
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class Album extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Album}
                style={this.props.style}
            />
        );
    }


}

export default Album;
