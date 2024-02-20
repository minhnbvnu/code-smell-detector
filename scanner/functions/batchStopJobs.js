async function batchStopJobs({ pipelines, prNum, action, name }) {
    const prJobs = await Promise.all(
        pipelines.map(p => p.getJobs({ type: 'pr' }).then(jobs => jobs.filter(j => j.name.includes(name))))
    );
    const flatPRJobs = prJobs.reduce((prev, curr) => prev.concat(curr));

    await Promise.all(flatPRJobs.map(j => stopJob({ job: j, prNum, action })));
}