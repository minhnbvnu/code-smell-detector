function printStatusTable(statusItems) {
  return migrateMongo.config.read().then(config => {
    const useFileHash = config.useFileHash === true;
    const table = new Table({ head: useFileHash ? ["Filename", "Hash", "Applied At"] : ["Filename", "Applied At"]});
    statusItems.forEach(item => table.push(_.values(item)));
    console.log(table.toString());
  })
  
}