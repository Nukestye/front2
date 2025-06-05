
import common from './common.json';

const ALL_LETTER_REGEX = /[A-Za-z]+/;


export function convertTimeToMilliseconds(time) {

    let matchArr = ALL_LETTER_REGEX.exec(time);

    var num = parseInt(time.substring(0, matchArr['index']));

    switch(matchArr[0]) {
        case 'ms':
            return num;
        case 's':
            return num * 1000; // convert to milliseconds
        case 'm':             
            return num * 60000; // convert to milliseconds
        case 'h':
            return num * 3600000;
        default:
            if (common.dev.CONSOLE_DEBUG) console.log('[UTIL] [convertTimeToMilliseconds] No match found, returning null');
            return null;
    }
}