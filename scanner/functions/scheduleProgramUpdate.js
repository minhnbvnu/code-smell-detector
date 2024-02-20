function scheduleProgramUpdate() {
                if (!host.setTimeout || !host.clearTimeout) {
                    return;
                }
                if (timerToUpdateProgram) {
                    host.clearTimeout(timerToUpdateProgram);
                }
                writeLog("Scheduling update");
                timerToUpdateProgram = host.setTimeout(updateProgramWithWatchStatus, 250);
            }