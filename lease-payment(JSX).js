function recordList(record) {
	//generate 2d array according to the json object that passed from the fetch api
	const day = Object.freeze({
		"monday": 0,
		"tuesday": 1,
		"wednesday": 2,
		"thursday": 3,
		"friday": 4,
		"saturday": 5,
		"sunday": 6,
	});

    let recordlist = [];
    let startdate = parseDate(record.start_date);
    let enddate = parseDate(record.end_date);
    Object.freeze(record);
    for (let i = new Date(startdate); i <= enddate; i.setDate(i.getDate() + 1)) {
        if (i.getDay() == day[record.payment_day]) {
            recordlist.push([startdate, new Date(i)]);
            i.setDate(i.getDate() + 1);
            startdate = new Date(i);
            if (record.frequency === "fortnightly") {
                i.setDate(i.getDate() + 12);
            }
            else if (record.frequency === "weekly") {
                i.setDate(i.getDate() + 5);
            }
            else if (record.frequency === "monthly") {
                i.setDate(i.getDate() + 26);
            }
        }
    }

    if (startdate <= enddate)
        recordlist.push([startdate, enddate]);

    for (let i = 0; i < recordlist.length; i++) {
        let days = daysBetween(recordlist[i][0], recordlist[i][1]) + 1;
        recordlist[i].push(days, "$"+(record.rent / 7 * days).toFixed(1));
    }
    return recordlist;
}

function treatAsUTC(date) {
	//convert date to UTC format in order to get the correct date result
	//reference: https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
	//calculate the days between two days
	//reference: https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript

    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}
function parseDate(input) {
	//parse to the according to the string given
	//reference: https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    var parts = input.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]); 
}

function displayDate(date)
{
	//check if the parameter passed is Date. If so, return toDateString
	if (date instanceof Date)
	{
		return date.toDateString();
	}
	return date.toString();
}

function isValidate(input) {
	//check if the input is not empty, shorter than 8, no non-letter and non-digit characters
	return input.match(/\W/) === null && input.length != 0 && input.length <= 8;
}