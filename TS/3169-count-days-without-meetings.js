"use strict";
function countDays(days, meetings) {
    let daysWithoutMeetings = 0;
    let startDay = 1;
    meetings.sort((a, b) => a[0] - b[0]);
    for (let [start, end] of meetings) {
        if (startDay < start) {
            daysWithoutMeetings += start - startDay;
        }
        if (startDay <= end) {
            startDay = end + 1;
        }
    }
    if (startDay <= days) {
        daysWithoutMeetings += days - startDay + 1;
    }
    return daysWithoutMeetings;
}
