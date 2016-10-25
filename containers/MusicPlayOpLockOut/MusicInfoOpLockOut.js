/**
 * Created by krinjadl on 2016-08-31.
 */
import React from 'react';
import styles from './MusicInfoOpLockOut.css';
import injectObgCom from 'obgComponents/Common/injectObgCom';
import classNames from 'classnames/bind';
import Album from 'obgComponents/Icon/Album';
import Artist from 'obgComponents/Icon/Artist';
import AudioTrack from 'obgComponents/Icon/AudioTrack';
import shallowCompare from 'react-addons-shallow-compare';
import AlbumImg from 'obgComponents/ImgIcon/Album';
import AudioTrackImg from 'obgComponents/ImgIcon/AudioTrack';
import ArtistImg from 'obgComponents/ImgIcon/Artist';

class MusicInfoOp extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }
    render(){
        const {
            show,
            pushElement,
            ...props,
        } = this.props;
        const iconStyle ={
            width:'40px',
            height:'40px',
            marginRight: '7px',
        };
        return(
            <div className={classNames(this.props.className, styles.Section)}>
                <h2 className={styles.Title}>{this.props.title}</h2>
            </div>
        );
    }
}

MusicInfoOp.defaultProps = {
    title:'Title',
    artist:'Artist',
    album:'Album',
};

export default injectObgCom(MusicInfoOp);