/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import injectObgCom from 'obgComponents/Common/injectObgCom';
import Button from 'obgComponents/Button/Button';
import styles from './PlayerButtonsLockOut.css';
import classNames from 'classnames/bind';
import btnStyles from './PlayerButtonStylesLockOut';
import shallowCompare from 'react-addons-shallow-compare';
import SkipPreviousImg from './Icon/SkipPrevious';
import SkipNextImg from './Icon/SkipNext';
import PauseImg from './Icon/Pause';
import PlayArrowImg from './Icon/PlayArrow';

class PlayerButtonsOp extends React.Component{
    constructor(props){
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleNav = this.handleNav.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    handleButtonClick(e){
        const target = e.currentTarget;
        this.props.onChangeStatus(target.name);
    }
    handleNav(e){
        const target = e.currentTarget;
        this.props.onChangeSong(target.name);
    }
    // buttonStyle,
    // pressedStyle,
    // disabledStyle,
    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        return(
            <div className={styles.Wrapper}>

                <Button
                    className={classNames(styles.PlayerButton)}
                    buttonStyle={btnStyles.button}
                    pressedStyle={btnStyles.pressedButton}
                    disabledStyle={btnStyles.disabledButton}
                    icon={<SkipPreviousImg className={styles.PlayerButtonIcon}/>}
                    onClick={this.handleNav}
                    name='previous'
                    disabled={this.props.first}
                    style={btnStyles.button}
                />
                <Button
                    className={styles.PlayerButton}
                    buttonStyle={btnStyles.button}
                    pressedStyle={btnStyles.pressedButton}
                    disabledStyle={btnStyles.disabledButton}
                    icon={this.props.playing ? <PauseImg className={styles.PlayerButtonIcon}/> :
                        <PlayArrowImg className={styles.PlayerButtonIcon}/> }
                    onClick={this.handleButtonClick}
                    name='playing'
                />
                <Button
                    className={classNames(styles.PlayerButton )}
                    buttonStyle={btnStyles.button}
                    pressedStyle={btnStyles.pressedButton}
                    disabledStyle={btnStyles.disabledButton}
                    icon={<SkipNextImg className={styles.PlayerButtonIcon}/>}
                    onClick={this.handleNav}
                    name='next'
                    disabled={this.props.last}
                />

            </div>
        );
    }
}

PlayerButtonsOp.defaultProps = {
    number:3,
    playing:false,
    first:true,
    last:false,
    onChangeStatus:()=>{},
    onChangeSong:()=>{},
};

export default injectObgCom(PlayerButtonsOp);