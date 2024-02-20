function cancelableClient(request) {
			/*jshint validthis:true */
			var d = when.defer();
			request.canceled = false;
			request.cancel = this.spy(function () {
				request.canceled = true;
				d.resolver.reject({ request: request });
			});
			return d.promise;
		}