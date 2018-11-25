class LeaseData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      loading: false,
      ready: false,
      data: null,
      error: null,
    };

    this.update = this.update.bind(this);
  }

  update(newID) {
    newID = encodeURIComponent(newID);
    this.setState({
      id: newID,
      loading: true,
      ready: false,
      data: null,
      error:null,
    });
    this.getNewJson(newID);
  }

  getNewJson(id) {
    let url = "https://hiring-task-api.herokuapp.com/v1/leases/"+id;
    fetch(url)
      .then(res => res.json())
      .then(
      (result) => {
        console.log(result);
        let lease = new Lease(result.id, result.start_date, result.end_date, result.rent, result.payment_day, result.frequency);
        console.log(lease.toString());
        this.setState({
          loading: false,
          ready: true,
          data: lease.paymentData()
        });
      },
      (error) => {
        console.log("Error: " + error.message);
        this.setState({
          loading: false,
          ready: true,
          error: error
        });
      }
    )
  }

  render() {
    if (this.state.error) {
      console.log("ERROR")
      return (
        <div>
          <Form callback = {this.update}/>
          Error: {this.state.error.message}
        </div>);
    } else if (this.state.loading) {
      console.log("Loading")
      return (
        <div>
          <Form callback = {this.update}/>
          Loading...
        </div>);
    } else if (this.state.ready) {
      console.log("Displaying")
      return (
        <div>
        <Form callback = {this.update}/>
        <Table data = {this.state.data}/>
        </div>
      );
    } else {
      console.log("Waiting")
      return (<Form callback = {this.update}/>);
    }
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(row => {
            return <Rows key={row.toString()} rowData = {row}/>
          })}
        </tbody>
      </table>
    );
  }
}

class Rows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rowData
    };
  }

  render() {
    return (
      <tr>
        <td key={"f"+this.state.data.paymentFrom.toString()}>
          {this.state.data.paymentFrom}
        </td>
        <td key={"t"+this.state.data.paymentTo.toString()}>
          {this.state.data.paymentTo}
        </td>
        <td key={"p"+this.state.data.paymentPeriod.toString()}>
          {this.state.data.paymentPeriod}
        </td>
        <td key={"a"+this.state.data.paymentAmount.toString()}>
          {this.state.data.paymentAmount}
        </td>
      </tr>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.changed = this.changed.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault()
    this.props.callback(this.state.value)
  }

  changed(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onSubmit = {this.submit}>
        <label>
          Lease ID:
          <input
            type = "text"
            value = {this.state.value}
            onChange = {this.changed}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}


ReactDOM.render(<LeaseData />, document.getElementById("main"));
