async function createRelease(options) {
  const client = new Octokit({
    auth: options.token,
  });

  const response = await client.rest.repos.createRelease({
    owner,
    repo,
    tag_name: options.tag,
    generate_release_notes: options.notes,
    draft: options.draft,
  });

  await uploadAsset(
    client,
    response.data,
    options.site,
    'Examples and docs (zip)',
  );

  await uploadAsset(
    client,
    response.data,
    options.package,
    'Package archive (zip)',
  );
}