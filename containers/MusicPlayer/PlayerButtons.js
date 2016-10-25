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
import styles from './PlayerButtons.css';
import btnStyles from './PlayerButtonStyles';
import shallowCompare from 'react-addons-shallow-compare';
import RepeatImg from 'obgComponents/ImgIcon/Repeat';
import RepeatOneImg from 'obgComponents/ImgIcon/RepeatOne';
import SkipPreviousImg from 'obgComponents/ImgIcon/SkipPrevious';
import SkipNextImg from 'obgComponents/ImgIcon/SkipNext';
import ShuffleImg from 'obgComponents/ImgIcon/Shuffle';
import PauseImg from 'obgComponents/ImgIcon/Pause';
import PlayArrowImg from 'obgComponents/ImgIcon/PlayArrow';

class PlayerButtons extends React.Component{
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
                <div className={styles.Item}>
                    <Button
                        buttonStyle={Object.assign({},btnStyles.button,btnStyles.repeatButton, (this.props.repeat!=0) ? btnStyles.selectedButton : {} )}
                        pressedStyle={btnStyles.pressedButton}
                        icon={(this.props.repeat==1) ? <RepeatOneImg className={styles.ButtonIcon}/> :<RepeatImg className={styles.ButtonIcon} />}
                        name='repeat'
                        onClick={this.handleButtonClick}
                        selected={this.props.repeat}
                        className={this.props.repeat ? styles.ButtonSelected:''}

                    />

                </div>
                <div className={styles.Item}>
                    <Button
                        className={styles.Button}
                        buttonStyle={btnStyles.button}
                        pressedStyle={btnStyles.pressedButton}
                        disabledStyle={btnStyles.disabledButton}
                        icon={<SkipPreviousImg className={styles.ButtonIcon} />}
                        onClick={this.handleNav}
                        name='previous'
                        disabled={this.props.first}
                        style={btnStyles.button}
                    />
                    <Button
                        className={styles.Button}
                        buttonStyle={btnStyles.button}
                        pressedStyle={btnStyles.pressedButton}
                        disabledStyle={btnStyles.disabledButton}
                        icon={this.props.playing ? <PauseImg className={styles.ButtonIcon} /> : <PlayArrowImg className={styles.ButtonIcon} /> }
                        onClick={this.handleButtonClick}
                        name='playing'
                    />
                    <Button
                        className={styles.Button}
                        buttonStyle={btnStyles.button}
                        pressedStyle={btnStyles.pressedButton}
                        disabledStyle={btnStyles.disabledButton}
                        icon={<SkipNextImg className={styles.ButtonIcon} />}
                        onClick={this.handleNav}
                        name='next'
                        disabled={this.props.last}
                    />
                </div>
                <div className={styles.Item}>
                    <Button
                        buttonStyle={Object.assign({},btnStyles.button,btnStyles.repeatButton, this.props.shuffle ? btnStyles.selectedButton : {} )}
                        pressedStyle={btnStyles.pressedButton}
                        icon={<ShuffleImg className={styles.ButtonIcon} />}
                        onClick={this.handleButtonClick}
                        selected={this.props.shuffle}
                        className={this.props.shuffle ? styles.ButtonSelected:''}
                        name='shuffle'
                    />
                </div>

            </div>
        );
    }
}

PlayerButtons.defaultProps = {
    number:5,
    playing:false,
    repeat:true,
    first:true,
    last:false,
    shuffle:false,
    onChangeStatus:()=>{},
    onChangeSong:()=>{},
};

export default injectObgCom(PlayerButtons);