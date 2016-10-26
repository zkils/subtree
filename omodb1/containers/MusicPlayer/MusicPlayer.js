/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import MusicInfo from './MusicInfo';
import MusicBar from './MusicBar';
import PlayerButtons from './PlayerButtons';
import Audio from 'obgComponents/Audio';
import injectObgCom from "obgComponents/Common/injectObgCom";
import shallowCompare from 'react-addons-shallow-compare';
/**
 * MusicPlayer Container
 * @extends React.Component
 * @example
 * <MusicPlayer
 *  musicList={musicListArr}
 *  song={selectedSongObj}
 *  onMusicSelected={this.props.handleMusicSelected}
 * >
 * </MusicPlayer>
 */
class MusicPlayer extends React.Component{
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
        return(
            <div>
                <MusicInfo
                    title={this.props.song.title}
                    artist={this.props.song.artist}
                    album={this.props.song.album}
                    imgSrc={this.props.song.cover}
                />
                <PlayerButtons
                    playing={this.props.playing}
                    repeat={this.props.repeat}
                    shuffle={this.props.shuffle}
                    onChangeSong={this.handleChangeSong}
                    onChangeStatus={this.handleChangeStatus}
                    first={this.props.first}
                    last={this.props.last}
                />
                <MusicBar
                    length={this.props.song.length}
                    elapsedTime={this.props.elapsedTime}
                    duration={this.props.duration}
                />
            </div>
        );
    }
    /**
     * propTypes form parent Component
     * @property {object} song - selected object song info
     * @property {func} onChangeSong - onClick next or previos button
     * @property {func} onChangeStatus - onClick play,pause,repeat,shuffle button
     * @property {bool} playing - playing status
     *  - default value `false`
     * @property {number} repeat - repeat status  - 0 no-reapeat 1 repeat one 2 repeat all
     *  - default value `1`
     * @property {bool} shuffle - shuffle status
     *  - default value `false`
     * @property {bool} first - first song of list
     *  - default value `false`
     * @property {bool} last - last song of list
     *  - default value `false`
     */
    static get propTypes() {
        return {
            song:React.PropTypes.object,
            onChangeSong:React.PropTypes.func,
            onChangeStatus:React.PropTypes.func,
            playing:React.PropTypes.bool,
            repeat:React.PropTypes.number,
            shuffle:React.PropTypes.bool,
            first:React.PropTypes.bool,
            last:React.PropTypes.bool,
        };
    }
}

MusicPlayer.defaultProps={
    onChangeSong:()=>{},
    onChangeStatus:()=>{},
    playing:false,
    repeat:1,
    shuffle:false,
    first:false,
    last:false,
    song:{},

};



export default injectObgCom(MusicPlayer);