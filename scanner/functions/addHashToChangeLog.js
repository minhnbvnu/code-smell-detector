function addHashToChangeLog(changelog) {
    changelog.find.returns({
      toArray: sinon.stub().returns(
        Promise.resolve([
          {
            fileName: "20160509113224-first_migration.js",
            fileHash: "0f295f21f63c66dc78d8dc091ce3c8bab8c56d8b74fb35a0c99f6d9953e37d1a",
            appliedAt: new Date("2016-06-03T20:10:12.123Z")
          },
          {
            fileName: "20160512091701-second_migration.js",
            fileHash: "18b4d9c95a8678ae3a6dd3ae5b8961737a6c3dd65e3e655a5f5718d97a0bff70",
            appliedAt: new Date("2016-06-09T20:10:12.123Z")
          }
        ])
      )
    })
  }