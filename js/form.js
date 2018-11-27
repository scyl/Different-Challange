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
