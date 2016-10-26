
import React from 'react';
import ImgIcon from '../../../components/ImgIcon/ImgIcon';
import styles from './PlayerButtonOpBg.css';


class Shuffle extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.Shuffle}
                imgSelectedClass={styles.ShuffleSelected}
                selected={this.props.selected}
                style={this.props.style}
            />
        );
    }


}

export default Shuffle;
