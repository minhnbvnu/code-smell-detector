async function uploadArtifacts() {
  let releaseForVersion = await releaseNotes.getRelease(
    releaseVersion,
    process.env.GITHUB_TOKEN
  );

  if (releaseForVersion.exists && !releaseForVersion.isDraft) {
    console.log(
      `Published release already exists for ${releaseVersion}, skipping upload.`
    );
    return;
  }

  console.log(
    `Uploading ${
      assets.length
    } release assets for ${releaseVersion} to Azure Blob Storage under '${azureBlobPath}'`
  );

  await uploadToAzure(
    process.env.ATOM_RELEASES_AZURE_CONN_STRING,
    azureBlobPath,
    assets
  );

  if (argv.linuxRepoName) {
    await uploadLinuxPackages(
      argv.linuxRepoName,
      process.env.PACKAGE_CLOUD_API_KEY,
      releaseVersion,
      assets
    );
  } else {
    console.log(
      '\nNo Linux package repo name specified, skipping Linux package upload.'
    );
  }

  const oldReleaseNotes = releaseForVersion.releaseNotes;
  if (oldReleaseNotes) {
    const oldReleaseNotesPath = path.resolve(
      os.tmpdir(),
      'OLD_RELEASE_NOTES.md'
    );
    console.log(
      `Saving existing ${releaseVersion} release notes to ${oldReleaseNotesPath}`
    );
    fs.writeFileSync(oldReleaseNotesPath, oldReleaseNotes, 'utf8');

    // This line instructs VSTS to upload the file as an artifact
    console.log(
      `##vso[artifact.upload containerfolder=OldReleaseNotes;artifactname=OldReleaseNotes;]${oldReleaseNotesPath}`
    );
  }

  if (argv.createGithubRelease) {
    console.log(`\nGenerating new release notes for ${releaseVersion}`);
    let newReleaseNotes = '';
    if (isNightlyRelease) {
      newReleaseNotes = await releaseNotes.generateForNightly(
        releaseVersion,
        process.env.GITHUB_TOKEN,
        oldReleaseNotes
      );
    } else {
      newReleaseNotes = await releaseNotes.generateForVersion(
        releaseVersion,
        process.env.GITHUB_TOKEN,
        oldReleaseNotes
      );
    }

    console.log(`New release notes:\n\n${newReleaseNotes}`);

    const releaseSha = !isNightlyRelease
      ? spawnSync('git', ['rev-parse', 'HEAD'])
          .stdout.toString()
          .trimEnd()
      : 'master'; // Nightly tags are created in atom/atom-nightly-releases so the SHA is irrelevant

    console.log(`Creating GitHub release v${releaseVersion}`);
    const release = await publishReleaseAsync({
      token: process.env.GITHUB_TOKEN,
      owner: 'atom',
      repo: !isNightlyRelease ? 'atom' : 'atom-nightly-releases',
      name: CONFIG.computedAppVersion,
      notes: newReleaseNotes,
      target_commitish: releaseSha,
      tag: `v${CONFIG.computedAppVersion}`,
      draft: !isNightlyRelease,
      prerelease: CONFIG.channel !== 'stable',
      editRelease: true,
      reuseRelease: true,
      skipIfPublished: true,
      assets
    });

    console.log('Release published successfully: ', release.html_url);
  } else {
    console.log('Skipping GitHub release creation');
  }
}