




function time_to_words(hours, minutes) {

    var ones = ["", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen",
            "sixteen", "seventeen", "eighteen", "nineteen"];
var tens = ["","","twenty", "thirty", "forty", "fifty"];

    var time = "It is ";
    var hour = ones[hours];
    if (minutes < 20) {
        var minute = ones[minutes];
    } else {
        var minute = tens[Math.floor(minutes / 10)];
        minute += " " + ones[minutes % 10];

    }

    if (minutes == 0) {
        minute = " O clock ";
    }

    time += hour + " " + minute;

    return time;
}

function generate_time() {
    var now = new Date();

    var time = [ now.getHours(), now.getMinutes()];

    var suffix = ( time[0] < 12 ) ? " A M" : " P M";

    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

    time[0] = time[0] || 12;


    return time_to_words(time[0], time[1]) + suffix;

}

function read_time() {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[1]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 0; //0 to 2
    msg.text = generate_time();
    msg.lang = 'en-US';

    speechSynthesis.speak(msg);
}



var now = new Date();
var time = [ now.getMinutes(), now.getSeconds() ];


var min_til = time[0] % 15;
var sec_til = (time[1] == 0) ? 0 : 60 - time[1];

if (sec_til != 0) {
    if (min_til == 0)
        min_til = 15;
    else
        min_til--;
}

setTimeout(function() {
    read_time();
    setInterval(function() {
        read_time();
    }, sec_til * 1000 + min_til * 60 * 1000);
}, sec_til * 1000 + min_til * 60 * 1000);



