function logResponse(data, isRejection) {
	        data = data || {};
	        // examine the data object
	        if (data instanceof Error) {
	          // log the Error object
	          _this.defaults.error('FAILED: ' + (data.message || 'Unknown Error'), data);
	          return DSUtils.Promise.reject(data);
	        } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	          var str = start.toUTCString() + ' - ' + config.method + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	
	          if (data.status >= 200 && data.status < 300 && !isRejection) {
	            if (_this.defaults.log) {
	              _this.defaults.log(str, data);
	            }
	            return data;
	          } else {
	            if (_this.defaults.error) {
	              _this.defaults.error('FAILED: ' + str, data);
	            }
	            return DSUtils.Promise.reject(data);
	          }
	        } else {
	          // unknown type for 'data' that is not an Object or Error
	          _this.defaults.error('FAILED', data);
	          return DSUtils.Promise.reject(data);
	        }
	      }