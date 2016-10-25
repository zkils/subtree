import React from 'react';
import styles from './MusicList.css';
import shallowCompare from 'react-addons-shallow-compare';
import { List, ListItem } from 'obgComponents/List';
import stylesObj from './MusicListStyles';
import {FormattedMessage} from 'react-intl';
/**
 * MusicList Container
 * <MusicList
 *  musicList={musicListArr}
 *  song={selectedSongObj}
 *  onMusicSelected={this.props.handleMusicSelected}
 * >
 * </MusicList>
 */
class MusicList extends React.Component{
    constructor(props) {
        super(props);
        this.checkMusicList = this.checkMusicList.bind(this);
        this.handleItemSelected = this.handleItemSelected.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    checkMusicList(){
        if(this.props.musicList){
            if(this.props.musicList.musicList.length>0){
                return this.props.musicList.musicList;
            }
            return false;
        }
        return false;
    }
    handleItemSelected(e){
        this.props.onMusicSelected(e.currentTarget.id);
        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        const musicList = this.checkMusicList();
        if(musicList){
            return(
                <div >
                    <List snap={false}  style={{padding:0,height:'423px'}}>
                        {musicList.map((child,key)=>{
                            const isSelected =(child.id==this.props.song.id);
                            return (
                                <ListItem
                                    key={child.id}
                                    id={child.id}
                                    buttonStyle={Object.assign({},stylesObj.listItem, (key+1)%2==1 ? stylesObj.oddItem : {})}
                                    pressedStyle={stylesObj.listItemPressed}
                                    className={styles.ListItem}
                                    onClick={this.handleItemSelected}
                                >
                                    <div className={styles.Cover}>
                                        <img src={child.cover} width='88px' height='88px'/>
                                    </div>
                                    <p className={styles.mainTitle} style={(isSelected) ? {color: '#00d4ff'} : {}}>
                                        {child.title}
                                    </p>
                                    <p className={styles.description} style={(isSelected) ? {color: '#00d4ff'} : {}}>
                                        {child.artist} / {child.album}
                                    </p>

                                </ListItem>
                            );
                        })}
                        <ListItem  buttonStyle={stylesObj.listItemVoid}></ListItem>
                    </List>
                </div>
            );
        }else{
            return(
                <div className={styles.Caption}>
                    <FormattedMessage id='comp.musiclist.caption'/>
                </div>
            );
        }
    }
    /**
     * propTypes form parent Component
     * @property {func} onMusicSelected - callback when song selected from list
     * @property {array} musicList - list of song info object
     * @property {object} song - selected object song info
     */
    static get propTypes() {
        return {
            onMusicSelected:React.PropTypes.func,
            musicList:React.PropTypes.object,
            song:React.PropTypes.object,
        };
    }
}

MusicList.defaultProps={
    onMusicSelected:()=>{},
};

export default MusicList;
