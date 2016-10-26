
import React from 'react';
import ImgIcon from '../../../components/ImgIcon/ImgIcon';
import styles from './PlayerButtonOpBg.css';


class SkipNext extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.SkipNext}
                style={this.props.style}
            />
        );
    }


}

export default SkipNext;
