function getMacUpdates(req, res) {
  if (req.query.version !== appMetadata.version) {
    const updateInfo = {
      name: appMetadata.version,
      pub_date: new Date().toISOString(),
      url: `http://localhost:${port}/mac/atom-mac.zip`,
      notes: '<p>No Details</p>'
    };

    console.log(
      `Received request for macOS updates (version = ${
        req.query.version
      }), sending\n`,
      updateInfo
    );
    res.json(updateInfo);
  } else {
    console.log(
      `Received request for macOS updates, sending 204 as Atom is up to date (version = ${
        req.query.version
      })`
    );
    res.sendStatus(204);
  }
}