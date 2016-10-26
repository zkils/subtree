import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';

/**
 * Audio Component
 * @extends React.Component
 * @example
 * <Audio src={"./music.mp3"} repeat={true} onTimeupdate={this.onTimeUpdate} />
 */
class Audio extends React.Component {

    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps, nextState);
    }

    /**
     * DOM event bind in here when compoennt mounted
     */
    componentDidMount(){
        this.audioDom = ReactDOM.findDOMNode(this.refs.audio);
        this.audioDom.addEventListener('ended',(e)=>{this.props.onEnded(e)});
        this.audioDom.addEventListener('timeupdate',(e)=>{
            let audioTime = {
                currentTime:this.audioDom.currentTime,
            };
            this.props.onTimeUpdate(audioTime);
        });

        this.audioDom.addEventListener('loadeddata',(e)=>{
            this.props.onAudioLoaded(this.audioDom.duration);
        });
        this.audioDom.addEventListener('canplay',(e)=>{
            this.props.onCanPlay(e);

        });
        this.audioDom.addEventListener('play',(e)=>{
            this.props.onPlay(e);

        });
        this.audioDom.addEventListener('error',(e)=>{
            this.props.onError(e);
        });
    }
    componentWillReceiveProps(nextProp){
        if(this.props.play==nextProp.play) return;
        if(nextProp.play){
            this.audioDom.play();
        }else{
            this.audioDom.pause();
        }
    }
    render() {
        return (
            <audio
                ref='audio'
                preload='auto'
                loop={this.props.repeat}
                autoPlay={this.props.autoPlay}
                src={this.props.src}
            >
            </audio>
        );
    }

    /**
     * propTypes form parent Component
     * @property {bool} repeat - repeat status
     *  - default value `true`
     * @property {bool} autoPlay - autoPlay  status
     *  - default value `false`
     * @property {string} audio source url
     * @property {func} onPlay - play event handler
     * @property {func} onError - error event handler
     * @property {func} onCanPlay - canPlay event handler
     * @property {func} onEnded - ended  event handler
     * @property {func} onTimeupdate - timeupdate  event handler
     * @property {func} onAudioLoaded - loadeddata  event handler
     */
    static get propTypes() {
        return {
            repeat : React.PropTypes.bool,
            autoPlay : React.PropTypes.bool,
            src : React.PropTypes.string,
            onPlay : React.PropTypes.func,
            onError : React.PropTypes.func,
            onCanPlay : React.PropTypes.func,
            onEnded : React.PropTypes.func,
            onTimeupdate : React.PropTypes.func,
            onAudioLoaded : React.PropTypes.func,
        };
    }

    /**
     * @example
     * <Audio src={"./music.mp3"} repeat={true} onTimeupdate={this.onTimeUpdate} />
     */
}
Audio.obgName = 'Audio';
Audio.defaultProps = {
    repeat:true,
    autoPlay:false,
    src:'',
    onPlay:()=>{},
    onError:()=>{},
    onCanPlay:()=>{},
    onEnded:()=>{},
    onTimeupdate:()=>{},
    onAudioLoaded:()=>{},
};

export default Audio;
