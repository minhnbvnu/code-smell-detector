function isWebSQLValid() {
    return typeof openDatabase === 'function';
}