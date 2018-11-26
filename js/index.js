/*
##       ########    ###     ######  ######## ########     ###    ########    ###
##       ##         ## ##   ##    ## ##       ##     ##   ## ##      ##      ## ##
##       ##        ##   ##  ##       ##       ##     ##  ##   ##     ##     ##   ##
##       ######   ##     ##  ######  ######   ##     ## ##     ##    ##    ##     ##
##       ##       #########       ## ##       ##     ## #########    ##    #########
##       ##       ##     ## ##    ## ##       ##     ## ##     ##    ##    ##     ##
######## ######## ##     ##  ######  ######## ########  ##     ##    ##    ##     ##
*/


// Main ReactJS Component
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

  // Callback function to load a new lease
  update(newID) {
    newID = encodeURIComponent(newID);
    this.setState({
      id: newID,
      loading: true,
      ready: false,
      data: null,
      error:null
    });
    this.getNewLeaseData(newID);
  }

  // Load given lease ID
  getNewLeaseData(id) {
    let url = "https://hiring-task-api.herokuapp.com/v1/leases/"+id;
    fetch(url)
      .then(res => res.json())
      .then(
      (result) => {
        // Create a Lease object from the JSON result
        let lease = new Lease(
          result.id,
          result.start_date,
          result.end_date,
          result.rent,
          result.payment_day,
          result.frequency
        );
        console.log(lease.toString());
        // Store Lease data into state.data
        this.setState({
          loading: false,
          ready: true,
          data: lease.paymentData()
        });
      },
      (error) => {
        // If an error occured, store the error
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
      // Render for if there is an error
      return (
        <div>
          <Form callback = {this.update}/>
          Error: {this.state.error.message}
        </div>);

    } else if (this.state.loading) {
      // Render for when lease data is loading
      return (
        <div>
          <Form callback = {this.update}/>
          Loading...
        </div>);

    } else if (this.state.ready) {
      // Render for if we have lease data ready to be displayed
      return (
        <div>
          <Form callback = {this.update}/>
          <Table data = {this.state.data}/>
        </div>
      );

    } else {
      // Render for if we have no lease to display
      return (
        <div>
          <Form callback = {this.update}/>
          <LeaseList callback = {this.update}/>
        </div>
      );

    }
  }
}

/*
########    ###    ########  ##       ########
   ##      ## ##   ##     ## ##       ##
   ##     ##   ##  ##     ## ##       ##
   ##    ##     ## ########  ##       ######
   ##    ######### ##     ## ##       ##
   ##    ##     ## ##     ## ##       ##
   ##    ##     ## ########  ######## ########
*/


// Table component for displaying a lease data
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
          {this.state.data.map((row) => {
            return <Rows key={row.toString()} rowData = {row}/>
          })}
        </tbody>
      </table>
    );
  }
}

// Rows component for each row in the table
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

/*
########  #######  ########  ##     ##
##       ##     ## ##     ## ###   ###
##       ##     ## ##     ## #### ####
######   ##     ## ########  ## ### ##
##       ##     ## ##   ##   ##     ##
##       ##     ## ##    ##  ##     ##
##        #######  ##     ## ##     ##
*/


// Form component for the looking up a specific lease ID
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      callback: this.props.callback
    };

    this.changed = this.changed.bind(this);
    this.submit = this.submit.bind(this);
  }

  // Handle submission of the form
  submit(event) {
    event.preventDefault()
    this.state.callback(this.state.value)
  }

  // Handle when text is entered
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
        <input type="submit" value="Search" />
      </form>
    )
  }
}

/*
##       ########    ###     ######  ######## ##       ####  ######  ########
##       ##         ## ##   ##    ## ##       ##        ##  ##    ##    ##
##       ##        ##   ##  ##       ##       ##        ##  ##          ##
##       ######   ##     ##  ######  ######   ##        ##   ######     ##
##       ##       #########       ## ##       ##        ##        ##    ##
##       ##       ##     ## ##    ## ##       ##        ##  ##    ##    ##
######## ######## ##     ##  ######  ######## ######## ####  ######     ##
*/


// List component for list of tenants
class LeaseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      callback: this.props.callback,
      loading: true,
      ready: false,
      list: null,
      error: null
    };

    this.fetchController = new AbortController();
  }

  // Get the list of tenants from the API
  getLeaseList() {
    let url = "https://hiring-task-api.herokuapp.com/v1/leases/";
    fetch(url, {signal: this.fetchController.signal})
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          loading: false,
          ready: true,
          list: result
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

  // When the component is ready
  componentDidMount() {
    this.getLeaseList();
  }

  // When the component is being removed
  componentWillUnmount() {
    // Cancal the fetch request
    this.fetchController.abort();
  }

  render() {
    if (this.state.error) {
      // Display if there is an error
      return (
        <div>
          Error: {this.state.error.message}
        </div>);

    } else if (this.state.loading) {
      // Display when list if loading
      return (
        <div>
          Loading...
        </div>);

    } else if (this.state.ready) {
      // Display the list when it's ready
      return (
        <div>
          Tenants:
          <ul>
            {this.state.list.map((item) => {
              return (
                <ListItem key = {item.id} data = {item} callback = {this.state.callback}/>
              )
            })}
          </ul>
        </div>
      );

    } else {
      // It should never go here
      console.log("List Waiting");
    }
  }
}

/*
##       ########    ###     ######  ######## #### ######## ######## ##     ##
##       ##         ## ##   ##    ## ##        ##     ##    ##       ###   ###
##       ##        ##   ##  ##       ##        ##     ##    ##       #### ####
##       ######   ##     ##  ######  ######    ##     ##    ######   ## ### ##
##       ##       #########       ## ##        ##     ##    ##       ##     ##
##       ##       ##     ## ##    ## ##        ##     ##    ##       ##     ##
######## ######## ##     ##  ######  ######## ####    ##    ######## ##     ##
*/


// A component for each tenant in the list
class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      callback: this.props.callback
    };
  }

  render() {
    return (
      <li onClick = {this.state.callback.bind(this, this.state.data.id)}>
      {this.state.data.tenant}
      </li>
    );
  }
}

// render the LeaseData in the main element
ReactDOM.render(<LeaseData />, document.getElementById("main"));
