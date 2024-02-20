function setupStructureIfRequired(callback) {
  r.connect(dbConfig, (err, conn) => {
    if ( err ) {
      console.error("Problem connecting to Rethinkdb on server start", err);
      process.exit(1);
    }

    r.table('artists').indexWait('createdAt').run(conn).then( () => {
      // If that worked, it means we already have our structure. We're done!
      console.info("Table and index already available!");
      callback();
    }).error( err => {
      // The table is not available! This means it's the first time running
      // with this DB. Let's create 'em.
      r.dbCreate(dbConfig.db).run(conn)
        .finally( () => r.tableCreate('artists').run(conn) )
        .finally( () => r.table('artists').indexCreate('createdAt').run(conn) )
        .finally( () => r.table('artists').indexWait('createdAt').run(conn) )
        .then( () => {
          console.info("Table and index have been created.");
          conn.close();
          callback();
        }).error( err => {
          console.error("Some sort of problem creating the table/index", err);
          process.exit(1);
        });
    });
  });
}