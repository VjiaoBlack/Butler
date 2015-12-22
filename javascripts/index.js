
var ones = ["", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen",
            "sixteen", "seventeen", "eighteen", "nineteen"];
var tens = ["","","twenty", "thirty", "forty", "fifty"];

var INTERVAL = 15;
var LOOP;

var TIMER;

function time_to_words(hours, minutes) {

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

    if (minutes < 10) {
        minute = " O " + minute;
    }

    time += hour + " " + minute;

    return time;
}

function number_to_word(number) {
    if (number > 19)
        return tens[Math.floor(number / 10)] + " " + ones[number % 10];
    else
        return ones[number];
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

function edit_interval() {
    // make schema for editing font.
    var a = prompt("Enter interval");

    var valid = false;

    for (var i = 0; i < ones.length; i++) {
        if (ones[i] == a) {
            window.INTERVAL = i;
            valid = true;
            break;
        }
    }
    if (!valid) {
        for (i = 0; i < tens.length; i++) {
            if (tens[i] == a) {
                window.INTERVAL = i;
                valid = true;
                break;
            }
        }
    }

    // note: need to handle compound numbers, like "twenty one".

    if (!valid) {
        alert("'a':" + a + " is invalid.");
    } else {
        document.getElementById("interval").innerHTML = a;
        if (a == "one") {
            document.getElementById("1").innerHTML = "minute";
        } else {
            document.getElementById("1").innerHTML = "minutes";
        }
        start_reading();
    }


    alert("Interval is: " + window.INTERVAL);


}

function start_reading() {
    if (window.LOOP) {
        clearInterval(window.LOOP);
    }

    var now = new Date();
    var time = [ now.getMinutes(), now.getSeconds() ];

    // var min_til = window.INTERVAL;
    // var sec_til = (time[1] == 0) ? 0 : 60 - time[1];

    // if (sec_til != 0) {
    //     if (min_til != 0)
    //         min_til--;
    // }

    window.LOOP = setInterval(function() {
        read_time();
    }, INTERVAL * 60 * 1000);

    setInterval(function() {
        set_cur_time();
    }, 100);

    set_alert_time(INTERVAL);
    setInterval(function() {
        set_alert_time(INTERVAL);
    }, 1000 * 60 * INTERVAL)


    setInterval(function() {
        set_wait_time();
    }, 100)
}

function set_cur_time() {
    var now = new Date();

    document.getElementById("cur_hours").innerHTML = now.getHours();
    document.getElementById("cur_minutes").innerHTML = now.getMinutes();
    document.getElementById("cur_seconds").innerHTML = now.getSeconds();
}

function set_alert_time(minute_interval) {
    var now = new Date();
    var then = new Date(now.getTime() + minute_interval * 60000);
    document.getElementById("alert_hours").innerHTML = then.getHours();
    document.getElementById("alert_minutes").innerHTML = then.getMinutes();
    document.getElementById("alert_seconds").innerHTML = then.getSeconds();
}

function set_wait_time() {
    var now = new Date();

    var hours = document.getElementById("alert_hours").innerHTML - now.getHours();
    var minutes = document.getElementById("alert_minutes").innerHTML - now.getMinutes();
    var seconds = document.getElementById("alert_seconds").innerHTML - now.getSeconds();

    while (seconds < 0) {
        minutes--;
        seconds += 60;
    }

    while (minutes < 0) {
        hours--;
        minutes += 60;
    }

    while (hours < 0) {
        hours += 24;
    }

    document.getElementById("wait_hours").innerHTML = hours;
    document.getElementById("wait_minutes").innerHTML = minutes;
    document.getElementById("wait_seconds").innerHTML = seconds;


    document.getElementById("minutes").innerHTML = number_to_word(minutes);
    document.getElementById("seconds").innerHTML = number_to_word(seconds);
}

start_reading();





