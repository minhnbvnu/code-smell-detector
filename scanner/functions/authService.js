function authService($state, AuthService) {
	return AuthService.isAuthorized()
	.then( data => {
		if (!data) $state.go('web.login')
	})
}