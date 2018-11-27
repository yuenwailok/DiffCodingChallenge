const LeasePayment = require('./lease-paymentclone');

test('All of the element in recordlist should be equal (weekly)', () => {
let record =
{
    "id": "3",
    "start_date": "2018-02-16",
    "end_date": "2018-03-15",
    "rent": 820,
    "frequency": "weekly",
    "payment_day": "friday"
}

let tempRecordList = [
[new Date(2018,1,16),new Date(2018,1,22),7,"$"+(820).toFixed(1)],
[new Date(2018,1,23),new Date(2018,2,1),7,"$"+(820).toFixed(1)],
[new Date(2018,2,2),new Date(2018,2,8),7,"$"+(820).toFixed(1)],
[new Date(2018,2,9),new Date(2018,2,15),7,"$"+(820).toFixed(1)],
];
  expect(LeasePayment.recordList(record)).toEqual(tempRecordList);
});

test('All of the element in recordlist should be equal (monthly)', () => {
let record =
{
    "id": "3",
    "start_date": "2018-02-15",
    "end_date": "2018-07-15",
    "rent": 820,
    "frequency": "monthly",
    "payment_day": "friday"
}

let tempRecordList = [
[new Date(2018,1,15),new Date(2018,1,15),1,"$"+(820/7*1).toFixed(1)],
[new Date(2018,1,16),new Date(2018,2,15),28,"$"+(820/7*28).toFixed(1)],
[new Date(2018,2,16),new Date(2018,3,12),28,"$"+(820/7*28).toFixed(1)],
[new Date(2018,3,13),new Date(2018,4,10),28,"$"+(820/7*28).toFixed(1)],
[new Date(2018,4,11),new Date(2018,5,7),28,"$"+(820/7*28).toFixed(1)],
[new Date(2018,5,8),new Date(2018,6,5),28,"$"+(820/7*28).toFixed(1)],
[new Date(2018,6,6),new Date(2018,6,15),10,"$"+(820/7*10).toFixed(1)]
];
  expect(LeasePayment.recordList(record)).toEqual(tempRecordList);
});

test('All of the element in recordlist should be equal (fortnightly)', () => {
let record =
{
    "id": "3",
    "start_date": "2018-8-9",
    "end_date": "2018-12-28",
    "rent": 510,
    "frequency": "fortnightly",
    "payment_day": "tuesday"
}

let tempRecordList = [
[new Date(2018,7,9),new Date(2018,7,13),5,"$"+(510/7*5).toFixed(1)],
[new Date(2018,7,14),new Date(2018,7,27),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,7,28),new Date(2018,8,10),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,8,11),new Date(2018,8,24),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,8,25),new Date(2018,9,8),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,9,9),new Date(2018,9,22),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,9,23),new Date(2018,10,5),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,10,6),new Date(2018,10,19),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,10,20),new Date(2018,11,3),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,11,4),new Date(2018,11,17),14,"$"+(510/7*14).toFixed(1)],
[new Date(2018,11,18),new Date(2018,11,28),11,"$"+(510/7*11).toFixed(1)]
];
  expect(LeasePayment.recordList(record)).toEqual(tempRecordList);
});

test('Should be the same Day', () => {
  expect(LeasePayment.parseDate("2018-8-9").toGMTString()).toBe(new Date(2018,7,9).toGMTString());
});


test('Should be 5', () => {
  expect(LeasePayment.daysBetween(new Date(2018,7,9),new Date(2018,7,14))).toBe(5);
});

test('string have symbol,empty,larger than 8 should return false',function()
{
	expect(LeasePayment.isValidate("1111.11")).toBe(false);
	expect(LeasePayment.isValidate(" 1s1 11")).toBe(false);
	expect(LeasePayment.isValidate("")).toBe(false);
	expect(LeasePayment.isValidate("aaaaaaaaaaaaaaaaa")).toBe(false);
}
);

test('these string should return true',function()
{
	expect(LeasePayment.isValidate("111111")).toBe(true);
	expect(LeasePayment.isValidate("11")).toBe(true);
	expect(LeasePayment.isValidate("aaaaa")).toBe(true);
	expect(LeasePayment.isValidate("aa1451aa")).toBe(true);
}
);