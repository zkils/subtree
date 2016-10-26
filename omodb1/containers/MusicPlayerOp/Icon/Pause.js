
import React from 'react';
import ImgIcon from '../../../components/ImgIcon/ImgIcon';
import styles from './PlayerButtonOpBg.css';


class Pause extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Pause}
                imgSelectedClass={styles.PauseSelected}
                selected={this.props.selected}
                style={this.props.style}
            />
        );
    }


}

export default Pause;
