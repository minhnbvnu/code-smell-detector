function receivePin() {
				adapter.getAccessToken(urls.accessToken, function(evt) {
					evt.success ? (adapter.saveAccessToken(site), callback && callback({username:evt.username, userid:evt.userid})) : alert('Twitter did not give us an access token!');
				});
			}