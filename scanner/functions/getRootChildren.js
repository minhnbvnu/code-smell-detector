function getRootChildren (props) {
  const intlData = {
    locale: props.application.locale,
    messages: i18n[props.application.locale]
  }
  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      {renderRoutes()}
    </IntlProvider>
  ]

  if (__DEVTOOLS__) {
    const DevTools = require('./components/DevTools').default
    rootChildren.push(<DevTools key="devtools" />)
  }
  return rootChildren
}