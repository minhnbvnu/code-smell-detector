function Setting({ initApp, history, globalSettings, setGlobalSettings }) {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [githubStars, setGithubStars] = useState('--');

  const logout = () => {
    window.socket.disconnect();
    localStorage.removeItem('userInfo');
    initApp(false);
    history.push('/login');
  };

  useEffect(() => {
    axios.get('https://api.github.com/repos/aermin/ghChat').then(res => {
      setGithubStars(res.data.stargazers_count);
    });
  });

  const _onChange = (type, value) => {
    setGlobalSettings({
      [type]: value,
    });
  };

  return (
    <div className="setting">
      <Modal
        title="确定退出？"
        visible={logoutModalVisible}
        confirm={logout}
        hasCancel
        hasConfirm
        cancel={() => setLogoutModalVisible(false)}
      />

      <div className="notificationConfig">
        <span>消息通知： </span>
        <Switch
          onChange={value => _onChange(GLOBAL_SETTINGS.NOTIFICATION, value)}
          checked={globalSettings.notification}
        />
      </div>

      <div
        className="githubStarRender"
        onClick={() => window.open('https://github.com/aermin/ghChat')}
      >
        <svg className="icon githubIcon" aria-hidden="true">
          <use xlinkHref="#icon-github-copy" />
        </svg>
        <span className="starTitle">{`${githubStars}  Stars`}</span>
      </div>

      <div
        className="contact"
        onClick={() => window.open('https://github.com/aermin/blog/issues/63')}
      >
        开启PWA(将ghChat安装到桌面)
      </div>
      <div className="contact" onClick={() => window.open('https://github.com/aermin/ghChat')}>
        项目地址 & 欢迎star
      </div>
      <div className="contact" onClick={() => openRepoUrl(history)}>
        项目交流群
      </div>
      <Button clickFn={() => setLogoutModalVisible(true)} value="退出登录" />
    </div>
  );
}