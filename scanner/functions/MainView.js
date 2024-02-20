function MainView(props) {
  const { pathname } = props.location;
  if (AUTH_ROUTERS.indexOf(pathname) < 0 && !localStorage.getItem('userInfo')) {
    sessionStorage.setItem('originalLink', window.location.href);
    props.history.push('/login');
  }

  let MainViewClassName;
  if (pathname === '/' || pathname === '/setting') {
    MainViewClassName = 'layout-left';
  } else {
    MainViewClassName = 'layout-left-mobile';
  }

  return (
    <div className={MainViewClassName}>
      <Route component={loadable(() => import('../containers/Tabs'))} />
      <Route
        path={['/', '/robot_chat', '/group_chat/:to_group_id', '/private_chat/:user_id']}
        exact
        component={loadable(() => import('../containers/HomePageList'))}
      />
      <Route
        path="/setting"
        exact
        component={loadable(() => import('../containers/SettingPage'))}
      />
    </div>
  );
}