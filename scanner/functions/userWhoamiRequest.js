function userWhoamiRequest(force = false) {
  if (!userWhoami || force) {
    get_request_api('/user/whoami')
      .done((data) => {
        if (notify_auto_api(data, true)) {
            userWhoami = data.data;
          sessionStorage.setItem('userWhoami', JSON.stringify(userWhoami));
        }
      });
  }
}