function signIn(user) {
  return dispatch => {
    dispatch(requestSignIn())
     return fetch('/api/sign_in', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => {
        if(response.ok) {
          cookie.save('username', user.username)
          dispatch(receiveSignIn(user.username));
          browserHistory.push('/chat');
        }
      })
      .catch(error => {throw error});
  };
}