function Connection(manager, options, req, socket, upgradeHead) {
  var _firstFrame, connection = this;

  _events.EventEmitter.call(this);

  this._req = req;
  this._socket = socket;
  this._manager = manager;
  this.id = manager.createId(socket.remotePort);

  this._options = Mixin({
    version: 'auto',    // String: Value must be either: draft75, draft76, auto
    origin: '*',        // String,Array: Valid connection origins.
    subprotocol: '*',   // String,Array: Valid connection subprotocols.
    debug: true
  }, options);

  if (connection._options.debug) {
    debug = function() {
      util.error(
          '\x1b[90mWS: ' +
          Array.prototype.join.call(arguments, ' ') +
          '\x1b[39m'
      );
      process.stdout.flush();
    };
  }

  Object.defineProperties(this, {
    version: {
      get: function() {
        if (req.headers['sec-websocket-key1'] &&
            req.headers['sec-websocket-key2']) {
          return 'draft76';
        }
        return 'draft75';
      }
    }
  });

  // Close timeout, for browsers that don't send the close packet.
  connection._closeTimer = undefined;

  // Set the initial connecting state.
  connection.state(1);
  // Setup the connection manager's state change listeners:
  connection.on('stateChange', function(state, laststate) {
    if (connection._options.debug) {
      debug(connection.id, 'stateChange: ', laststate, '->', state);
    }

    if (state === 4) {
      manager.attach(connection);
      // Handle first frame breakages.
      if (_firstFrame) {
        parser.write(_firstFrame);
        delete _firstFrame;
      }
    } else if (state === 5 && laststate !== 6 && laststate !== 5) {
      close(connection);
    } else if (state === 6 && laststate === 5) {
      manager.detach(connection);
      connection.emit('close');
    }
  });


  // Start to process the connection
  if (!checkVersion(this)) {
    this.reject('Invalid version.');
  } else {
    // Let the debug mode know that we have a connection:
    debug(this.id, this.version + ' connection');

    socket.setTimeout(0);
    socket.setNoDelay(true);
    socket.setKeepAlive(true, 0);

    // Handle incoming data:
    var parser = new Parser(this);

    parser.on('message', function(message) {
      debug(connection.id, 'recv: ' + message);
      connection.emit('message', message);
    });

    parser.on('close', function() {
      debug(connection.id, 'requested close');

      // Timer to catch clients that don't send close packets.
      // I'm looking at you safari and chrome.
      if (connection._closeTimer) {
        clearTimeout(connection._closeTimer);
      }
      connection.state(5);
    });

    socket.on('data', function(data) {
      parser.write(data);
    });

    // Handle the end of the stream, and set the state
    // appropriately to notify the correct events.
    socket.on('end', function() {
      debug(connection.id, 'end');
      connection.state(5);
    });

    socket.on('timeout', function() {
      debug(connection.id, 'timed out');
      connection.emit('timeout');
    });

    socket.on('error', function(e) {
      debug(connection.id, 'error', e);
      if (e.errno != Constants.EPIPE ||
          e.errno != connection.ECONNRESET) {
        connection.emit('error', e);
      }
      connection.state(5);
    });

    // Bubble errors up to the manager.
    connection.bubbleEvent('error', manager);

    // Carry out the handshaking.
    //    - Draft75: There's no upgradeHead, goto Then.
    //      Draft76: If there's an upgradeHead of the right length, goto Then.
    //      Then: carry out the handshake.
    //
    //    - Currently no browsers to my knowledge split the upgradeHead off
    //      the request,
    //      but in the case it does happen, then the state is set to waiting for
    //      the upgradeHead.
    //
    // This switch is sorted in order of probably of occurence.
    switch (this.version) {
      case 'draft76':
        if (upgradeHead.length >= 8) {
          if (upgradeHead.length > 8) {
            _firstFrame = upgradeHead.slice(8, upgradeHead.length);
          }

          handshakes.draft76(connection, upgradeHead.slice(0, 8));
        } else {
          connection.reject('Missing key3');
        }
        break;
      case 'draft75':
        handshakes.draft75(connection);
        break;
      default:
        connection.reject('Unknown version: ' + this.version);
        break;
    }
  }
}