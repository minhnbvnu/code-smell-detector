function renderRoutes () {
  return (
    <ReduxRouter>
      <Route component={Application}>
        <Route path="/" component={Home} />
        <Redirect from="/account" to="/account/profile" />
        <Route path="stargazers" component={GithubStargazers}>
          <Route path=':username/:repo' component={GithubRepo} />
          <Route path=':username' component={GithubUser} />
        </Route>
        <Route path="about" component={About} />
        <Route path="account" component={Account} onEnter={requireAuth}>
          <Route path="profile" component={AccountHome} />
          <Route path="secret-area" component={SuperSecretArea} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="logout" onEnter={logout} />
      </Route>
    </ReduxRouter>
  )
}