function config_share(name) {
  return async(this, function* () {
    yield exec(
      "sharedfolder", "add", name,
      "--name", "Root",
      "--hostpath", "/"
    );

    yield exec(
      "setextradata", name,
      "VBoxInternal2/SharedFoldersEnableSymlinksCreate/Root",
      "1"
    );
  });
}