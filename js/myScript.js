/***********************************************/
/* GLOBAL VARIABLES                            */
/***********************************************/
var watchTime = 0; // hundredths of seconds
var watchIsRunning = false;

var timerStartTime = 0;
var timerTime = 0;
var timerIsRunning = false;

/***********************************************/
/* UI CACHE                                   */
/***********************************************/
var ui = {};

window.onload = function() {
    ui.startStopBtn = document.getElementById("startStop");
    ui.watchResetBtn = document.getElementById("watchReset");
    ui.startPauseBtn = document.getElementById("startPause");
    ui.timerResetBtn = document.getElementById("timerReset");
    ui.timeInput = document.getElementById("timeEntered");
    ui.timeAlert = document.getElementById("timeAlert");

    ui.swHandMinute = document.getElementById("swHandMinute");
    ui.swHandSecond = document.getElementById("swHandSecond");
    ui.swHandCenti = document.getElementById("swHandCenti");

    updateAnalogHands(0);
    syncUI();
};

/***********************************************/
/* ANALOG STOPWATCH                            */
/***********************************************/
function updateAnalogHands(time) {
    const centi = time % 100;
    const totalSeconds = time / 100;
    const seconds = totalSeconds % 60;
    const minutes = (totalSeconds / 60) % 60;

    // User request: swap roles
    // - black "minute" hand element acts as the seconds hand
    // - red "second" hand element acts as the fast centisecond hand

    // (Optional/hidden) minute indication
    if (ui.swHandCenti) {
        ui.swHandCenti.style.transform =
            `translate(-50%, -100%) rotate(${(minutes / 60) * 360}deg)`;
    }

    // Red hand: milliseconds (1 full rotation per 1000ms)
    if (ui.swHandSecond) {
        // Stopwatch ticks in 10ms, so derive an ms phase from hundredths.
        // Example: centi=0..99 -> msWithinSecond=0..990
        const msWithinSecond = (centi * 10) % 1000;
        const msAngle = (msWithinSecond / 1000) * 360;
        ui.swHandSecond.style.transform =
            `translate(-50%, -100%) rotate(${msAngle}deg)`;
    }

    // Black hand: seconds sweep (one revolution per minute)
    if (ui.swHandMinute) {
        ui.swHandMinute.style.transform =
            `translate(-50%, -100%) rotate(${(seconds / 60) * 360}deg)`;
    }
}

/***********************************************/
/* STOPWATCH LOGIC                             */
/***********************************************/
function startWatch() {
    watchIsRunning = !watchIsRunning;

    if (watchIsRunning) {
        timeIncrement();
    }

    syncUI();
}

function timeIncrement() {
    if (!watchIsRunning) return;

    setTimeout(function() {
        watchTime++;
        timeOutput(watchTime, "stopWatchOutput");
        updateAnalogHands(watchTime);
        timeIncrement();
    }, 10);
}

function watchReset() {
    watchIsRunning = false;
    watchTime = 0;

    document.getElementById("stopWatchOutput").innerHTML = "00:00:00";
    updateAnalogHands(0);
    syncUI();
}

/***********************************************/
/* DIGITAL OUTPUT                              */
/***********************************************/
function timeOutput(timeInput, display) {
    document.getElementById(display).innerHTML = [
        Math.floor(timeInput / 100 / 60 % 60),
        Math.floor(timeInput / 100 % 60),
        timeInput % 100
    ].map(formatNumber).join(':');
}

function formatNumber(n) {
    return (n < 10 ? "0" : "") + n;
}

/***********************************************/
/* COUNTDOWN TIMER (UNCHANGED CORE)            */
/***********************************************/
function startTimer() {
    var startTime = ui.timeInput.value;
    var valid = false;

    if (!timerIsRunning) {
        if (timerStartTime === 0) {
            valid = validateStartTime(startTime);
        } else {
            valid = true;
        }

        if (valid) {
            timerIsRunning = true;
            timeDecrement();
        }
    } else {
        timerStartTime = timerTime;
        timerIsRunning = false;
    }

    syncUI();
}

function timeDecrement() {
    if (!timerIsRunning) return;

    setTimeout(function() {
        if (timerTime === 0) {
            timerIsRunning = false;
            ui.timeAlert.innerHTML = "Time is up!";
            syncUI();
            return;
        }

        timerTime--;
        timeOutput(timerTime, "countdownTimerOutput");
        timeDecrement();
    }, 10);
}

function validateStartTime(startTime) {
    var regex = /^([0][0-9]:[0-5][0-9]:\d{2})|([1][0]:[0][0]:[0][0])$/;

    if (!regex.test(startTime)) {
        ui.timeAlert.innerHTML = "Invalid time format.";
        return false;
    }

    timerTime = setTimerTime(startTime);
    ui.timeInput.value = "";
    ui.timeAlert.innerHTML = "";
    return true;
}

function setTimerTime(startTime) {
    var parts = startTime.split(":");
    return (
        parseInt(parts[0]) * 6000 +
        parseInt(parts[1]) * 100 +
        parseInt(parts[2])
    );
}

function timerReset() {
    timerIsRunning = false;
    timerStartTime = 0;
    timerTime = 0;

    if (ui.timeInput) ui.timeInput.value = "";
    if (ui.timeAlert) ui.timeAlert.innerHTML = "";

    var out = document.getElementById("countdownTimerOutput");
    if (out) out.innerHTML = "00:00:00";

    syncUI();
}

/***********************************************/
/* UI SYNC                                    */
/***********************************************/
function syncUI() {
    if (ui.startStopBtn) {
        var label = ui.startStopBtn.querySelector(".btnText");
        var nextText = watchIsRunning ? "Pause" : (watchTime > 0 ? "Resume" : "Start");
        if (label) {
            label.textContent = nextText;
        } else {
            ui.startStopBtn.textContent = nextText;
        }
    }

    if (ui.startPauseBtn) {
        var label2 = ui.startPauseBtn.querySelector(".btnText");
        var nextText2 = timerIsRunning ? "Pause" : (timerTime > 0 ? "Resume" : "Start");
        if (label2) {
            label2.textContent = nextText2;
        } else {
            ui.startPauseBtn.textContent = nextText2;
        }
    }
}