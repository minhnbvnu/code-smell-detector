function importFromChromeTimeline(events, fileName) {
  // It seems like sometimes Chrome timeline files contain multiple CpuProfiles?
  // For now, choose the first one in the list.
  const cpuProfileByID = new Map(); // Maps profile IDs (like "0x3") to pid/tid pairs formatted as `${pid}:${tid}`

  const pidTidById = new Map(); // Maps pid/tid pairs to thread names

  const threadNameByPidTid = new Map(); // The events aren't necessarily recorded in chronological order. Sort them so
  // that they are.

  utils_1.sortBy(events, e => e.ts);

  for (let event of events) {
    if (event.name === 'CpuProfile') {
      const pidTid = `${event.pid}:${event.tid}`;
      const id = event.id || pidTid;
      cpuProfileByID.set(id, event.args.data.cpuProfile);
      pidTidById.set(id, pidTid);
    }

    if (event.name === 'Profile') {
      const pidTid = `${event.pid}:${event.tid}`;
      cpuProfileByID.set(event.id || pidTid, Object.assign({
        startTime: 0,
        endTime: 0,
        nodes: [],
        samples: [],
        timeDeltas: []
      }, event.args.data));

      if (event.id) {
        pidTidById.set(event.id, `${event.pid}:${event.tid}`);
      }
    }

    if (event.name === 'thread_name') {
      threadNameByPidTid.set(`${event.pid}:${event.tid}`, event.args.name);
    }

    if (event.name === 'ProfileChunk') {
      const pidTid = `${event.pid}:${event.tid}`;
      const cpuProfile = cpuProfileByID.get(event.id || pidTid);

      if (cpuProfile) {
        const chunk = event.args.data;

        if (chunk.cpuProfile) {
          if (chunk.cpuProfile.nodes) {
            cpuProfile.nodes = cpuProfile.nodes.concat(chunk.cpuProfile.nodes);
          }

          if (chunk.cpuProfile.samples) {
            cpuProfile.samples = cpuProfile.samples.concat(chunk.cpuProfile.samples);
          }
        }

        if (chunk.timeDeltas) {
          cpuProfile.timeDeltas = cpuProfile.timeDeltas.concat(chunk.timeDeltas);
        }

        if (chunk.startTime != null) {
          cpuProfile.startTime = chunk.startTime;
        }

        if (chunk.endTime != null) {
          cpuProfile.endTime = chunk.endTime;
        }
      } else {
        console.warn(`Ignoring ProfileChunk for undeclared Profile with id ${event.id || pidTid}`);
      }
    }
  }

  if (cpuProfileByID.size > 0) {
    const profiles = [];
    let indexToView = 0;
    utils_1.itForEach(cpuProfileByID.keys(), profileId => {
      let threadName = null;
      let pidTid = pidTidById.get(profileId);

      if (pidTid) {
        threadName = threadNameByPidTid.get(pidTid) || null;

        if (threadName) {}
      }

      const profile = importFromChromeCPUProfile(cpuProfileByID.get(profileId));

      if (threadName && cpuProfileByID.size > 1) {
        profile.setName(`${fileName} - ${threadName}`);

        if (threadName === 'CrRendererMain') {
          indexToView = profiles.length;
        }
      } else {
        profile.setName(`${fileName}`);
      }

      profiles.push(profile);
    });
    return {
      name: fileName,
      indexToView,
      profiles
    };
  } else {
    throw new Error('Could not find CPU profile in Timeline');
  }
}