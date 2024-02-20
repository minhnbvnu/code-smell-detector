function __getLayoutConfigKey({ Vue }) {
  const { userStatus, layout } = __getUserStatusAndLayout({ Vue });
  return `apps.current.${userStatus}.${layout}`;
}