function jobReducer (state = initialState, { type, payload }) {
  const jobs = state.get('jobs')

  switch (type) {
    case LOAD_ADMIN_ALL_JOBS:
      return state.set('error', false)
    case LOAD_ADMIN_ALL_JOBS_SUCCESS:
      return state.set('jobs', payload.jobs)
    case LOAD_USER_ALL_JOBS:
      return state.set('error', false)
    case LOAD_USER_ALL_JOBS_SUCCESS:
      return state.set('jobs', payload.jobs)
    case LOAD_ADMIN_SINGLE_JOB:
      return state.set('error', false)
    case LOAD_ADMIN_SINGLE_JOB_SUCCESS:
      return state.set('jobs', payload.job)
    case LOAD_ADMIN_JOB_LOGS:
      return state
    case LOAD_ADMIN_JOB_LOGS_SUCCESS:
      return state
    case LOAD_USER_JOB_LOGS:
      return state
    case LOAD_USER_JOB_LOGS_SUCCESS:
      return state
    case OPERATE_JOB:
      return state.set('error', false)
    case OPERATE_JOB_SUCCESS:
      if (typeof (payload.result) === 'number') {
        return state.set('jobs', jobs.filter(g => !Object.is(g.job.id, payload.result)))
      } else {
        const startIndexOperate = jobs.indexOf(jobs.find(g => Object.is(g.job.id, payload.result.job.id)))
        jobs.fill(payload.result, startIndexOperate, startIndexOperate + 1)
        return state.set('jobs', jobs.slice())
      }
    case OPERATE_JOB_ERROR:
      return state
    case LOAD_JOB_NAME:
      return state.set('jobNameExited', false)
    case LOAD_JOB_NAME_SUCCESS:
      return state.set('jobNameExited', false)
    case LOAD_JOB_NAME_ERROR:
      return state.set('jobNameExited', true)
    case LOAD_JOB_SOURCENS:
      return state
    case LOAD_JOB_SOURCENS_SUCCESS:
      return state
    case LOAD_JOB_SOURCENS_ERROR:
      return state
    case LOAD_JOB_SINKNS:
      return state
    case LOAD_JOB_SINKNS_SUCCESS:
      return state
    case LOAD_JOB_SINKNS_ERROR:
      return state
    case LOAD_JOB_SOURCETOSINK_EXIST:
      return state.set('jobSourceToSinkExited', false)
    case LOAD_JOB_SOURCETOSINK_EXIST_SUCCESS:
      return state.set('jobSourceToSinkExited', false)
    case LOAD_JOB_SOURCETOSINK_EXIST_ERROR:
      return state.set('jobSourceToSinkExited', true)
    case ADD_JOB:
      return state.set('jobSubmitLoading', true)
    case ADD_JOB_SUCCESS:
      jobs.unshift(payload.result)
      return state
        .set('jobs', jobs.slice())
        .set('jobSubmitLoading', false)
    case QUERY_JOB:
      return state.set('error', false)
    case QUERY_JOB_SUCCESS:
      return state
    case EDIT_JOB:
      return state.set('jobSubmitLoading', true)
    case EDIT_JOB_SUCCESS:
      const startIndexEdit = jobs.indexOf(jobs.find(p => Object.is(p.job.id, payload.result.job.id)))
      jobs.fill(payload.result, startIndexEdit, startIndexEdit + 1)
      return state
        .set('jobs', jobs.slice())
        .set('jobSubmitLoading', false)
    case LOAD_JOB_DETAIL:
      return state.set('error', false)
    case LOAD_JOB_DETAIL_SUCCESS:
      return state
    case LOAD_BACKFILL_TOPIC:
      return state
    case LOAD_BACKFILL_TOPIC_SUCCUSS:
      return state
    case LOAD_BACKFILL_TOPIC_ERROR:
      return state
    default:
      return state
  }
}