function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}