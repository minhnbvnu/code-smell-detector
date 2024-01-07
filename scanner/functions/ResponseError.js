constructor(response) {
    const message = 'Unexpected response status: ' + response.status;
    super(message);

    /**
     * @type {string}
     */
    this.name = 'ResponseError';

    /**
     * @type {XMLHttpRequest}
     */
    this.response = response;
  }