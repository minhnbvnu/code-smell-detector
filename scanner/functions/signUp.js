function signUp(user) {
  return dispatch => {
    dispatch(requestSignUp())
    return fetch('/api/sign_up', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => {
        if(response.ok) {
          cookie.save('username', user.username)
          dispatch(receiveUser(user.username));
          browserHistory.push('/chat');
        }
      })
      .catch(error => {throw error});
  };
}