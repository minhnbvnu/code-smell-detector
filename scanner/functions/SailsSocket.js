function SailsSocket (opts){
      var self = this;
      opts = opts||{};

      // Absorb opts
      self.useCORSRouteToGetCookie = opts.useCORSRouteToGetCookie;
      self.url = opts.url;
      self.multiplex = opts.multiplex;
      self.transports = opts.transports;

      // Set up "eventQueue" to hold event handlers which have not been set on the actual raw socket yet.
      self.eventQueue = {};

      // Listen for special `parseError` event sent from sockets hook on the backend
      // if an error occurs but a valid callback was not received from the client
      // (i.e. so the server had no other way to send back the error information)
      self.on('sails:parseError', function (err){
        consolog('Sails encountered an error parsing a socket message sent from this client, and did not have access to a callback function to respond with.');
        consolog('Error details:',err);
      });

      // TODO:
      // Listen for a special private message on any connected that allows the server
      // to set the environment (giving us 100% certainty that we guessed right)
      // However, note that the `console.log`s called before and after connection
      // are still forced to rely on our existing heuristics (to disable, tack #production
      // onto the URL used to fetch this file.)
    }