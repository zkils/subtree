/**
 * Created by krinjadl on 2016-09-02.
 */


module.exports = {
    timeToSec: (time)=>{
        let hmsArr = /^(?:(?:([01]?\d|[0-9][0-9]):)?([0-5]?\d):)?([0-5]?\d)$/.exec(time),
            totalSeconds = 0;
        if(hmsArr){
            hmsArr = hmsArr.slice(1);
            hmsArr.map((child,i)=>{
                if(child){
                    let number = Number(child);
                    switch(i){
                        case 0:
                            totalSeconds = totalSeconds + number * 3600;
                            break;
                        case 1:
                            totalSeconds = totalSeconds + number * 60;
                            break;
                        case 2:
                            totalSeconds += number;
                            break;
                        default:
                            break;
                    }
                }
            });
        }else{
            totalSeconds = time;
        }
        return totalSeconds;
    },
    secToTime: (sec)=>{
        let date = new Date(null),
            regex = /^(00)+:[0-5]?\d:[0-5]?\d/,
            timeStr;
        date.setSeconds(Math.round(sec));
        timeStr = date.toISOString().substr(11, 8);
        if(regex.exec(timeStr)){
            return timeStr.substr(3,6);
        } else{
            return timeStr;
        }
    },
    getCurrentTimeText(max,ratio){
        const maxSec = this.timeToSec(max);
        return this.secToTime(maxSec * ratio/100);
    }
};