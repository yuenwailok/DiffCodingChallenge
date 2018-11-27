function SummaryTable(props)
{
	//this is the table to display the summary information of the lease
	console.log(props instanceof Date);
	let para = [];
	try
			{
				para = Object.getOwnPropertyNames(props.obj).map((item, index) =>
				<tr key={index}>
					<td key={item + "" + index}>{item.replace('_', '-')}</td>
					<td key={props.obj[item] + "" + index}>{props.obj[item]}</td>
				</tr>
			);
			}
			catch(err)
			{
				return <p>Something bad happened that makes the system cannot display the lease's summary</p>;
			}
			
			
			return (<div><p>This is the summary of the lease</p><table border="1 px solid">
                    <tbody>
						{para}
                    </tbody>
                </table></div>);
}

function PaymentTable(props)
{	
	//this is the table to display the lease payments
	let table = [];
	try
	{
		table = props.record.map((item1,index1) =>
		<tr key={index1}>
			{item1.map((item2,index2) => <td key={index1+""+index2}>{displayDate(item2)}</td>)} 
		</tr>
	);
	}
	catch(err)
	{
		return <p>Something goes wrong when the system display the payments</p>
	}
	
	return (<div><p>These are the payments of your lease</p>
	<table border="1">
                    <tbody>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Days</th>
							<th>Amount</th>
						</tr>
                        {table}
                    </tbody>
                </table>
				</div>);
}

function DisplayTable(props)
{
	//this is the table to display both tables mentioned above
	try
	{
		if (props.record.length != 0)
		{				
			return  <div>
				<SummaryTable obj = {props.obj}/>
				<PaymentTable record = {props.record}/>
             	</div>
		}
		return null;
	}
	catch(err)
	{
		return null;
	}
	
	
}

function InputForms(props)
{
	//this is the form that allow user to enter lease id in order to search for lease payments
	return (<form onSubmit={props.handleSubmit}>
                 <label>
                        Lease id:
          <input type="text" value={props.value} onChange={props.handleChange} required pattern="[a-zA-Z0-9]+" maxLength="8" />
                    </label>
					<br/>
                    <input type="submit" value="Submit" />
                </form>);
}

class DisplayRecord extends React.Component {
	//this is the main component
    constructor(props) {
        super(props);
        this.state =
            {
                value: '',
                records: [],
                jsonObject: {},
                error: false
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
	
	componentDidCatch(caughterror) {
    this.setState({ error: true });
  }
	
    handleChange(event) {
        this.setState({ value: event.target.value });
		
    }
    handleSubmit(event) {
		//when user click the submit button, the apps will start fetching according to the id entered
		//if the id contains non-letter or non-digit character, is empty or is longer than 8, the system will display error message
        fetch(this.props.address + this.state.value)
            .then(response => {
                if (response.ok && isValidate(this.state.value)) {
                    return response.json();
                } else {
                    throw new Error('The system cannot found the lease record according to the id you have entered.');
                }
            }
            )
            .then(data => {
				
                this.setState({ records: recordList(data), jsonObject: data, error: false }
                )
            }).catch(error => {this.setState({ error: true })});

        event.preventDefault();

    }
	
    render() {
        if (this.state.error) {
            return (<div><InputForms handleSubmit={this.handleSubmit} value = {this.state.value} handleChange = {this.handleChange} />
				<p>Sorry, we cannot search for the lease record according to the id you have entered</p>
            </div>);
        }
		else
		{
        return (<div>
				<InputForms handleSubmit={this.handleSubmit} value = {this.state.value} handleChange = {this.handleChange} />
				<DisplayTable record={this.state.records} obj={this.state.jsonObject}/>
            </div>
        );
		}

        
    }
}
	 
ReactDOM.render(<DisplayRecord address={"https://hiring-task-api.herokuapp.com/v1/leases/"}/>, document.getElementById('root'));