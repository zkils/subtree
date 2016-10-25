/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import MusicInfo from './MusicInfoLockOut';
import PlayerButtons from './PlayerButtonsLockOut';
import Audio from 'obgComponents/Audio';
import injectObgCom from "obgComponents/Common/injectObgCom";
import shallowCompare from 'react-addons-shallow-compare';
import styles from './MusicPlayerLockOut.css';

class MusicPlayerOp extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeSong = this.handleChangeSong.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    handleChangeSong(key){
        this.props.onChangeSong(key);
    }

    handleChangeStatus(key){
        this.props.onChangeStatus(key);
    }

    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        let bgStyle ={
            backgroundImage: 'url(' + this.props.song.cover + ')',
            backgroundPositionY: '57px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: '0px',
            left: '0',
            width: '800px',
            height: '480px',
            opacity: '.2',
            zIndex: '0',

        };
        return(
            <div>
                <div style={bgStyle} />
                <div className={styles.Wrapper}>
                    <MusicInfo
                        title={this.props.song.title}
                    />
                    <PlayerButtons
                        playing={this.props.playing}
                        onChangeSong={this.handleChangeSong}
                        onChangeStatus={this.handleChangeStatus}
                        first={this.props.first}
                        last={this.props.last}
                    />
                </div>
            </div>
        );
    }
}

MusicPlayerOp.defaultProps={
    //url:'./resources/songs.json',
    // musicList:[],
    onChangeSong:()=>{},
    onChangeStatus:()=>{},
};

// const mapStateToProps = (state) => {
//     return {
//         musicList: state.getMusicList.musicList,
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return{
//         onUpdateSong : (url) =>dispatch(fetchMusicList(url))
//     };
// };
//
// MusicPlayer = connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);

export default injectObgCom(MusicPlayerOp);