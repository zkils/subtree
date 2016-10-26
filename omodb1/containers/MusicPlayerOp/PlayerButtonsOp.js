/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import injectObgCom from 'obgComponents/Common/injectObgCom';
import Button from 'obgComponents/Button/Button';
import Pause from 'obgComponents/Icon/Pause';
import PlayArrow from 'obgComponents/Icon/PlayArrow';
import Repeat from 'obgComponents/Icon/Repeat';
import Shuffle from 'obgComponents/Icon/Shuffle';
import SkipNext from 'obgComponents/Icon/SkipNext';
import SkipPrevious from 'obgComponents/Icon/SkipPrevious';
import styles from './PlayerButtonsOp.css';
import classNames from 'classnames/bind';
import btnStyles from './PlayerButtonStylesOp';
import shallowCompare from 'react-addons-shallow-compare';
import RepeatImg from './Icon/Repeat';
import RepeatOneImg from './Icon/RepeatOne';
import SkipPreviousImg from './Icon/SkipPrevious';
import SkipNextImg from './Icon/SkipNext';
import ShuffleImg from './Icon/Shuffle';
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
                    buttonStyle={Object.assign({}, btnStyles.button, (this.props.repeat != 0) ? btnStyles.selectedButton : {})}
                    pressedStyle={btnStyles.pressedButton}
                    icon={(this.props.repeat == 1) ? <RepeatOneImg className={styles.PlayerButtonIcon} selected={this.props.repeat!=0}/> :
                        <RepeatImg className={styles.PlayerButtonIcon} selected={this.props.repeat!=0} />}
                    name='repeat'
                    onClick={this.handleButtonClick}
                    selected={this.props.repeat}
                    className={classNames(styles.PlayerButton, this.props.repeat ? styles.PlayerButtonSelected : '')}

                />
                <Button
                    className={classNames(styles.PlayerButton, styles.ForwardButton )}
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
                    className={classNames(styles.PlayerButton, styles.BackwardButton )}
                    buttonStyle={btnStyles.button}
                    pressedStyle={btnStyles.pressedButton}
                    disabledStyle={btnStyles.disabledButton}
                    icon={<SkipNextImg className={styles.PlayerButtonIcon}/>}
                    onClick={this.handleNav}
                    name='next'
                    disabled={this.props.last}
                />
                <Button
                    buttonStyle={Object.assign({}, btnStyles.button, btnStyles.repeatButton, this.props.shuffle ? btnStyles.selectedButton : {})}
                    pressedStyle={btnStyles.pressedButton}
                    icon={<ShuffleImg className={styles.PlayerButtonIcon} selected={this.props.shuffle}/>}
                    onClick={this.handleButtonClick}
                    selected={this.props.shuffle}
                    className={classNames(styles.PlayerButton, this.props.shuffle ? styles.PlayerButtonSelected : '')}
                    name='shuffle'
                />

            </div>
        );
    }
}

PlayerButtonsOp.defaultProps = {
    number:5,
    playing:false,
    repeat:true,
    first:true,
    last:false,
    shuffle:false,
    onChangeStatus:()=>{},
    onChangeSong:()=>{},
};

export default injectObgCom(PlayerButtonsOp);