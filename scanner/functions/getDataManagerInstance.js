function getDataManagerInstance(opts = {}) {
  const options = Object.assign({}, {
    data: {
      columns: ['Name', 'Email', 'Occupation'],
      rows: [
        ['Faris', 'faris@test.com', 'Software Developer'],
        ['Manas', 'manas@test.com', 'Software Engineer'],
        ['Ameya', 'ameya@test.com', 'Hacker']
      ]
    }
  }, opts);

  const datamanager = new DataManager(options);
  datamanager.init();
  return datamanager;
}