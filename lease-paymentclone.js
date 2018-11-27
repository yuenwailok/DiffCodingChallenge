"use strict";

function recordList(record) {
    var day = Object.freeze({
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6
    });

    var recordlist = [];
    var startdate = parseDate(record.start_date);
    var enddate = parseDate(record.end_date);
    Object.freeze(record);
    for (var i = new Date(startdate); i <= enddate; i.setDate(i.getDate() + 1)) {
        if (i.getDay() == day[record.payment_day]) {
            recordlist.push([startdate, new Date(i)]);
            i.setDate(i.getDate() + 1);
            startdate = new Date(i);
            if (record.frequency === "fortnightly") {
                i.setDate(i.getDate() + 12);
            } else if (record.frequency === "weekly") {
                i.setDate(i.getDate() + 5);
            } else if (record.frequency === "monthly") {
                i.setDate(i.getDate() + 26);
            }
        }
    }

    if (startdate <= enddate) recordlist.push([startdate, enddate]);

    for (var _i = 0; _i < recordlist.length; _i++) {
        var days = daysBetween(recordlist[_i][0], recordlist[_i][1]) + 1;
        recordlist[_i].push(days, "$" + (record.rent / 7 * days).toFixed(1));
    }
    return recordlist;
}

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}
function parseDate(input) {
    var parts = input.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function displayDate(date) {
    if (date instanceof Date) {
        return date.toDateString();
    }
    return date.toString();
}

function isValidate(input) {
	return input.match(/\W/) === null && input.length != 0 && input.length <= 8;
}

module.exports = 
{
	recordList: recordList,
	treatAsUTC: treatAsUTC,
	daysBetween: daysBetween,
	parseDate: parseDate,
	displayDate: displayDate,
	isValidate: isValidate
}