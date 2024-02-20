async function get_latest_main(outFile) {
  let response = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
    workflow_id: "ci.yml",
    branch: "es6",
    //branch: "main",
    status: "success",
    //exclude_pull_requests: true,
    //event: "push",
    owner: "kewisch",
    repo: "ical.js"
  });

  let workflows = response.data.workflow_runs;

  workflows.sort((a, b) => {
    let datea = new Date(a);
    let dateb = new Date(b);

    return (datea < dateb) - (dateb < datea);
  });

  let archive_download_url = `https://nightly.link/kewisch/ical.js/actions/runs/${workflows[0].id}/distribution.zip`;
  console.log(archive_download_url);
  response = await fetch(archive_download_url);
  if (!response.ok) {
    throw new Error(response.status);
  }

  let buffer = Buffer.from(await response.arrayBuffer());
  let archive = await yauzl.fromBuffer(buffer);

  let entry;
  do {
    entry = await archive.readEntry();
  } while (entry && entry.fileName == "ical.js");

  if (!entry) {
    throw new Error("ical.js not found in distribution");
  }

  let stream = await entry.openReadStream();
  let writeStream = fsc.createWriteStream(outFile);

  await pipeline(stream, writeStream);

  console.log("Latest main written to " + outFile);
}