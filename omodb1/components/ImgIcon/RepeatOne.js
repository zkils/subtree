
import React from 'react';
import ImgIcon from './ImgIcon';
import styles from './ImgIconBg.css';


class RepeatOne extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImgIcon
                className={this.props.className}
                imgClass={styles.RepeatOne}
                style={this.props.style}
            />
        );
    }


}

export default RepeatOne;
