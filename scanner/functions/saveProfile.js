async function saveProfile(data) {
    // data.profile described here: https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-Profile
    // Process the data however you wish… or,
    // Use the JSON file, open Chrome DevTools, Menu, More Tools, JavaScript Profiler, `load`, view in the UI
    const filename = `profile-${Date.now()}.cpuprofile`;
    const string = JSON.stringify(data.profile, null, 2);
    fs.writeFileSync(filename, string);
    console.log('Done! Profile data saved to:', filename);

    await client.close();
    await chrome.kill();
  }