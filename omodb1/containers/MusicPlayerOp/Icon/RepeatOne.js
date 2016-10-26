
import React from 'react';
import ImgIcon from '../../../components/ImgIcon/ImgIcon';
import styles from './PlayerButtonOpBg.css';

class RepeatOne extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.RepeatOne}
                imgSelectedClass={styles.RepeatOneSelected}
                selected={this.props.selected}
                style={this.props.style}
            />
        );
    }


}

export default RepeatOne;
