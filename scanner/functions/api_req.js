function api_req(api_endpoint, access_token, req, callback, requestType) {
    if (!requestType) requestType = 'normal';

    // Auth
    var authInfo = new RequestEnvelop.AuthInfo({
      provider: self.playerInfo.provider,
      token: new RequestEnvelop.AuthInfo.JWT(access_token, 59)
    });


    //console.log(req);

    var f_req = new RequestEnvelop({
      unknown1: 2,
      rpc_id: 1469378659230941192,

      requests: req,

      latitude: self.playerInfo.latitude,
      longitude: self.playerInfo.longitude,
      altitude: self.playerInfo.altitude,

      unknown12: 989
    });

    if (self.playerInfo.authTicket) {
      f_req.auth_ticket = self.playerInfo.authTicket;

      var lat = self.playerInfo.latitude, lng = self.playerInfo.longitude, alt = self.playerInfo.altitude;
      var authTicketEncoded = self.playerInfo.authTicket.encode().toBuffer();

      var signature = new Signature({
        location_hash1: pogoSignature.utils.hashLocation1(authTicketEncoded, lat, lng, alt).toNumber(),
        location_hash2: pogoSignature.utils.hashLocation2(lat, lng, alt).toNumber(),
        unk22: crypto.randomBytes(32),
        timestamp: new Date().getTime(),
        timestamp_since_start: (new Date().getTime() - self.playerInfo.initTime),
      });

      if (!Array.isArray(req)) {
        req = [req];
      }

      req.forEach(function(request) {
        var reqHash = pogoSignature.utils.hashRequest(authTicketEncoded, request.encode().toBuffer()).toString();
        var hash = require('long').fromString(reqHash, true, 10);
        signature.request_hash.push(hash);
      });

      // Simulate real device
      // add  condition
      if( self.playerInfo.device_info !== null ) {
          signature.device_info = new Signature.DeviceInfo({
            device_id: self.playerInfo.device_info.device_id,
            android_board_name: self.playerInfo.device_info.android_board_name,
            android_bootloader: self.playerInfo.device_info.android_bootloader,
            device_brand: self.playerInfo.device_info.device_brand,
            device_model: self.playerInfo.device_info.device_model,
            device_model_identifier: self.playerInfo.device_info.device_model_identifier,
            device_model_boot: self.playerInfo.device_info.device_model_boot,
            hardware_manufacturer: self.playerInfo.device_info.hardware_manufacturer,
            hardware_model: self.playerInfo.device_info.hardware_model,
            firmware_brand: self.playerInfo.device_info.firmware_brand,
            firmware_tags: self.playerInfo.device_info.firmware_tags,
            firmware_type: self.playerInfo.device_info.firmware_type,
            firmware_fingerprint: self.playerInfo.device_info.firmware_fingerprint
          });
     }

      signature.location_fix = new Signature.LocationFix({
        provider: "network",
        timestamp_since_start: (new Date().getTime() - self.playerInfo.initTime),
        provider_status: 3,
        location_type: 1
      });

      var iv = crypto.randomBytes(32);

      pogoSignature.encrypt(signature.encode().toBuffer(), iv, function(err, signatureEnc) {
        f_req.unknown6 = new RequestEnvelop.Unknown6({
          unknown1: 6,
          unknown2: new RequestEnvelop.Unknown6.Unknown2({
            unknown1: signatureEnc
          })
        });
        compiledProtobuf(f_req);
      });

    } else {
      f_req.auth = authInfo;
      compiledProtobuf(f_req);
    }

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
  }