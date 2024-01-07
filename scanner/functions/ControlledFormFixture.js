constructor(props) {
    super(props);
    this.state = {name: '', email: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }