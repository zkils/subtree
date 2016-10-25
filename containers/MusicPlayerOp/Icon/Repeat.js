
import React from 'react';
import ImgIcon from '../../../components/ImgIcon/ImgIcon';
import styles from './PlayerButtonOpBg.css';

class Repeat extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Repeat}
                imgSelectedClass={styles.RepeatSelected}
                selected={this.props.selected}
                style={this.props.style}
            />
        );
    }


}

export default Repeat;
