// Constants
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

// Utils
const time_to_elapsed_percentage = (/** @type {number} */ d1) => (100 * Math.abs(d1 - Date.now())) / MS_IN_DAY;
const time_to_elapsed_string = (/** @type {number} */ time) => {
    return {
        days: Math.floor(time / MS_IN_DAY),
        hours: Math.floor((time % MS_IN_DAY) / MS_IN_HOUR),
        minutes: Math.floor((time % MS_IN_HOUR) / MS_IN_MINUTE),
        seconds: Math.floor((time % MS_IN_MINUTE) / MS_IN_SECOND),
    };
};

export { time_to_elapsed_percentage, time_to_elapsed_string };
