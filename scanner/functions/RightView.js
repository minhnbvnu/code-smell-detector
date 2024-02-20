function RightView(props) {
  const { pathname } = props.location;
  let RightViewClassName;

  if (pathname === '/' || pathname === '/setting') {
    RightViewClassName = 'layout-right-mobile';
  } else {
    RightViewClassName = 'layout-right';
  }

  return (
    <div className={RightViewClassName}>
      <Route path="/robot_chat" component={loadable(() => import('../containers/RobotPage'))} />
      <Route
        path="/group_chat/:to_group_id"
        component={loadable(() => import('../containers/GroupChatPage'))}
      />
      <Route
        path="/private_chat/:user_id"
        component={loadable(() => import('../containers/PrivateChatPage'))}
      />
      {['/', '/setting'].map((path, index) => (
        <Route
          path={path}
          exact
          component={loadable(() => import('../containers/WelcomePage'))}
          key={index}
        />
      ))}
    </div>
  );
}