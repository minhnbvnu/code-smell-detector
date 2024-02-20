function compiledProtobuf(protobuf) {
      //console.log(JSON.stringify(protobuf))
      protobuf = f_req.encode().toBuffer();

      var options = {
        url: api_endpoint,
        body: protobuf,
        encoding: null,
        headers: {
          'User-Agent': 'Niantic App'
        }
      };

      self.queue.add(options, requestType, function (err, response, body) {
        if (err) {
          return callback(new Error('Error'));
        }

        if (response === undefined || body === undefined) {
          console.error('[!] RPC Server offline');
          return callback(new Error('RPC Server offline'));
        }

        var f_ret;
        try {
          f_ret = ResponseEnvelop.decode(body);
        } catch (e) {
          if (e.decoded) {
            // Truncated
            console.warn(e);
            f_ret = e.decoded; // Decoded message with missing required fields
          }
        }

        if (f_ret) {
          if (f_ret.auth_ticket) {
            self.playerInfo.authTicket = f_ret.auth_ticket;
          }
          return callback(null, f_ret);
        } else {
          api_req(api_endpoint, access_token, req, callback);
        }
      });
    }