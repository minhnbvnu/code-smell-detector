function _maybeLinkAndroid(library) {
  if (!_pathExists(`node_modules/${library}/android`)) {
    return;
  }
  if (
    (!_pathExists('android/settings.gradle')) ||
    (!_pathExists('android/app/build.gradle'))) {
    console.log('The library contains native Android code but this is not an ' +
        'Android project, skipping.'
    );
    return;
  }
  if (!_pathExists(`node_modules/${library}/android/build.gradle`)) {
    console.log('Looks like the Android library has incorrect format: ' +
        'android/build.gradle is missing.'
    );
    return;
  }

  // Update settings.gradle
  if (fs.readFileSync('android/settings.gradle', 'utf8').indexOf(`include ':${library}'`) !== -1) {
    console.log('The library is already present in android/settings.gradle.');
  } else {
    fs.appendFileSync('android/settings.gradle',
      `${eol}// ${library} dependency${eol}` +
      `include ':${library}'${eol}` +
      `project(':${library}').projectDir = ` +
          `new File(rootProject.projectDir, '../node_modules/${library}/android')${eol}`
    );
    console.log('Updated android/settings.gradle');
  }

  // Update android/app/build.gradle
  const build = fs.readFileSync('android/app/build.gradle', 'utf8');
  if (build.indexOf(`compile project(":${library}")`) !== -1) {
    console.log('The library is already present in android/app/build.gradle.');
  } else {
    const append = (
      // Include sources
      `    compile project(":${library}")${eol}` +
      // Include libs/*.jar
      `    compile fileTree(dir: "node_modules/${library}/android/libs", include: ["*.jar"])`
    );
    const buildWithDeps = build.replace(
      /dependencies {([^}]*)}/g,
      `dependencies {$1${eol}${append}${eol}}`
    );
    fs.writeFileSync('android/app/build.gradle', buildWithDeps, 'utf8');
    console.log('Updated android/app/build.gradle');
  }
  // We could try to automate this as well.
  // E.g. by convention the package name would end with Package.java.
  console.log('Next step: add the library to your MainActivity.java by calling addPackage().\n' +
    `Look for the package name in node_modules/${library}/android/src/main/java`
  );
}