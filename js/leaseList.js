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
