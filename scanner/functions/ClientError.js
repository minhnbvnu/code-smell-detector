constructor(client) {
    super('Failed to issue request');

    /**
     * @type {string}
     */
    this.name = 'ClientError';

    /**
     * @type {XMLHttpRequest}
     */
    this.client = client;
  }