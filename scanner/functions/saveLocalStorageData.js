function saveLocalStorageData() {
      fs.writeFileSync(dataPath, JSON.stringify(localStorageData))
    }