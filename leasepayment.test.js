'use strict';

const shallow = require('./node_modules/enzyme');
const React = require('./node_modules/react');
const Adapter = require('./node_modules/enzyme-adapter-react-16');
const LeasePaymentDisplay = require('./recordtestclone1');
const renderer = require('./node_modules/react-test-renderer');
const recordlist = require('./lease-paymentclone.js');

shallow.configure({ adapter: new Adapter() });
const record = Object.freeze({
    "id": "3",
    "start_date": "2018-02-16",
    "end_date": "2018-4-15",
    "rent": 820,
    "frequency": "fortnightly",
    "payment_day": "friday"
}); 

test('DisplayRecord: DisplayTable should have proper props after the state is filed',function()
{
	const component = shallow.mount(React.createElement(LeasePaymentDisplay.DisplayRecord, null));
	expect(component.find('InputForms').length).toBe(1);
	component.setState({
		records: recordlist.recordList(record),
		jsonObject: record
	});
	expect(component.find('DisplayTable').prop('record')).toEqual(recordlist.recordList(record));
	expect(component.find('DisplayTable').prop('obj')).toBe(record);
}
);

test('DisplayTable: PaymentTable and SummaryTable should have proper props',function()
{
	const component = shallow.mount(React.createElement(LeasePaymentDisplay.DisplayTable, { record: recordlist.recordList(record), obj: record }));
	expect(component.find('PaymentTable').prop('record')).toEqual(recordlist.recordList(record));
	expect(component.find('SummaryTable').prop('obj')).toBe(record);
}
);

test('SummaryTable should display elements', function() {

  let component = renderer.create(React.createElement(LeasePaymentDisplay.SummaryTable, { obj: record }));  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('SummaryTable should not display', function () {

  let component = renderer.create(React.createElement(LeasePaymentDisplay.SummaryTable, { obj: null }));  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  
});

test('SummaryTable should return single <p> only',function() 
{
	let component = shallow.mount(React.createElement(LeasePaymentDisplay.SummaryTable, { obj: null }));
	expect(component.find('p').length).toBe(1);
}
);

test('SummaryTable: should return a table with the property displayed',function() 
{
	let component = shallow.mount(React.createElement(LeasePaymentDisplay.SummaryTable, { obj: record }));
	expect(component.find('p').length).toBe(1);
	expect(component.find('table').length).toBe(1);
	expect(component.find('tr').length).toBe(Object.getOwnPropertyNames(record).length);
	expect(component.find('td').length).toBe(Object.getOwnPropertyNames(record).length*2);
}
);

test('PaymentTable: should display payments',function()
{
	let component = renderer.create(React.createElement(LeasePaymentDisplay.PaymentTable, { record: recordlist.recordList(record) }));
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
}
);

test('PaymentTable: should display error',function()
{
	let component = renderer.create(React.createElement(LeasePaymentDisplay.PaymentTable, { record: null }));
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
}
);

test('PaymentTable: should display nothing',function()
{
	let component = renderer.create(React.createElement(LeasePaymentDisplay.PaymentTable, { record: [] }));
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
}
);

test('PaymentTable: should return single <p> only',function() 
{
	let component = shallow.mount(React.createElement(LeasePaymentDisplay.PaymentTable, { record: null }));
	expect(component.find('p').length).toBe(1);
	expect(component.find('p').text()).toBe('Something goes wrong when the system display the payments');
}
);

test('PaymentTable: should return list of payment',function() 
{
	let component = shallow.mount(React.createElement(LeasePaymentDisplay.PaymentTable, { record: recordlist.recordList(record) }));
	//console.log(recordlist.recordList(record));
	console.log(component.prop('record'));
	expect(component.find('td').length).toBe(recordlist.recordList(record).length * 4);
}
);

test('DisplayRecord: (have error)',function()
{
	let component = shallow.mount(React.createElement(LeasePaymentDisplay.DisplayRecord, null));
	component.setState({error:true});
	expect(component.find('p').length).toBe(1);
	expect(component.find('p').text()).toBe('Sorry, we cannot search for the lease record according to the id you have entered');
}
);

test('DisplayRecord: (no error)',function()
{
	let component = shallow.shallow(React.createElement(LeasePaymentDisplay.DisplayRecord, null));
	expect(component.find('div').length).toBe(1);
	expect(component.find('DisplayTable').length).toBe(1);
	expect(component.find('InputForms').length).toBe(1);
}
);

test('DisplayTable: (empty list)',function()
{
	let component = shallow.shallow(React.createElement(LeasePaymentDisplay.DisplayTable, { record: null, obj: null }));
	expect(component.type()).toEqual(null);
}
);

test('snapshot DisplayRecord (no error, no state)',function()
{
  var component = renderer.create(React.createElement(LeasePaymentDisplay.DisplayRecord, null));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}
);