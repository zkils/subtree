
import React from 'react';
import styles from './MusicBar.css';
import injectObgCom from 'obgComponents/Common/injectObgCom';
import classNames from 'classnames/bind';
import ProgressBar from 'obgComponents/ProgressBar';
import shallowCompare from 'react-addons-shallow-compare';
import TimeConverter from 'utils/TimeConverter';

class MusicBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            progressBarPosition:0
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }
    componentWillReceiveProps(nextProps){
        const progressBarPosition = Math.round(nextProps.elapsedTime/ nextProps.duration*100);
        this.setState({
            progressBarPosition:progressBarPosition
        });
    }

    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        const iconStyle ={
            width:'36px',
            height:'36px'
        };
        return(
            <div className={classNames(this.props.className, styles.Section)}>
                <div className={styles.Time}>{TimeConverter.secToTime( this.props.elapsedTime)}</div>
                <ProgressBar
                    wrapperClass = {styles.ProgressBar}
                    value={this.state.progressBarPosition}
                />
                <div className={styles.Time}>{TimeConverter.secToTime(this.props.duration)}</div>
            </div>
        );
    }
}

MusicBar.defaultProps = {
    length:'00:00',
    elapsedTime:0,
    duration:0,
};

export default injectObgCom(MusicBar);