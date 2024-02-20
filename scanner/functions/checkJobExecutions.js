function checkJobExecutions(jobNum) {
            if (jobNum < jobCount) {
              console.log('checking execution status on ' + preRegisteredThingName + ' for job: ' + jobIdPrefix + '-' + jobNum.toString());
              iot.describeJobExecution({ thingName: preRegisteredThingName, jobId: jobIdPrefix + '-' + jobNum.toString() }, function(err, data) {
                if (!isUndefined(data) && !isUndefined(data.execution) &&
                	((jobNum & 1) ? data.execution.status === 'FAILED' : (data.execution.status === 'SUCCESS' || data.execution.status === 'SUCCEEDED'))) {
                  jobCompletedCount++;
                }

                console.log('cancelling job ' + jobIdPrefix + '-' + jobNum.toString() + ' to prevent leaving orphan jobs');
                iot.cancelJob({ jobId: jobIdPrefix + '-' + jobNum.toString() });

                checkJobExecutions(jobNum + 1);
              });
            }
          }