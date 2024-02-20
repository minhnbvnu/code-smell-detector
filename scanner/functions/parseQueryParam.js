function parseQueryParam (request) {
  let projectId = _.get(request, ['fee', 'project', 'projectId'], 0)
  let startAt = _.get(request, ['query', 'start_at'], 0)
  let endAt = _.get(request, ['query', 'end_at'], 0)
  let url = _.get(request, ['query', 'url'], '')
  let page = _.get(request, ['query', 'page'], 1)
  let countType = _.get(request, ['query', 'count_type'], DATE_FORMAT.UNIT.HOUR)
  let errorNameListJson = _.get(request, ['query', 'error_name_list_json'], '[]')
  let errorNameList = []
  try {
    errorNameList = JSON.parse(errorNameListJson)
  } catch (error) {
    errorNameList = []
  }

  // 提供默认值
  if (startAt <= 0) {
    startAt = moment().startOf(DATE_FORMAT.UNIT.DAY).unix()
  }
  if (endAt <= 0) {
    endAt = moment().endOf(DATE_FORMAT.UNIT.DAY).unix()
  }

  let parseResult = {
    projectId,
    startAt,
    endAt,
    url,
    page,
    errorNameList,
    countType
  }
  return parseResult
}