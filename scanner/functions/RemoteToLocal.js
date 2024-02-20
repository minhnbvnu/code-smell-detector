async function RemoteToLocal () {
  await StoreRemote()
  store.commit('setFavorite', await getFavorite())
}