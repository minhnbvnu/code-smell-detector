function Binding(system) {
  /**
   * Mock file system.
   * @type {FileSystem}
   */
  this._system = system;

  /**
   * Lookup of open files.
   * @type {Object<number, FileDescriptor>}
   */
  this._openFiles = {};

  /**
   * Counter for file descriptors.
   * @type {number}
   */
  this._counter = -1;

  const stdin = new FileDescriptor(constants.O_RDWR);
  stdin.setItem(new File.StandardInput());
  this.trackDescriptor(stdin);

  const stdout = new FileDescriptor(constants.O_RDWR);
  stdout.setItem(new File.StandardOutput());
  this.trackDescriptor(stdout);

  const stderr = new FileDescriptor(constants.O_RDWR);
  stderr.setItem(new File.StandardError());
  this.trackDescriptor(stderr);
}