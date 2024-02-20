async function mount (props) {
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}