async function getStackEvents(rosClient, stackId, region, stackName) {

  let isComplete = false;

  const pageSize = 50;
  let requestPageNumber = 1;
  let totalCount;
  let pageNumber;

  let leftPageCollect = [];

  do {

    const params = {
      'StackId': stackId,
      'RegionId': region,
      'PageSize': pageSize,
      'PageNumber': requestPageNumber
    };

    await time.sleep(2000);

    const rs = await rosClient.request('ListStackEvents', params, requestOption);

    const events = rs.Events;

    totalCount = rs.TotalCount;
    pageNumber = rs.PageNumber;

    const index = _.findIndex(events, event => {

      return event.ResourceType === ROS_RESOURCE_TYPE && _.includes(ROS_STATUS_PROGRESS, event.Status);
    });

    // 0: find it but not begin
    if (index === 0 && requestPageNumber === 1) {
      return {
        isComplete: false,
        events: []
      };
    }

    // -1: not find
    if (index === -1) {

      leftPageCollect = _.concat(leftPageCollect, events);
      requestPageNumber++;
      continue;
    }

    const concatEvents = _.concat(leftPageCollect, events);

    let sliceEvents;

    if (requestPageNumber > 1) {

      sliceEvents = _.slice(concatEvents, 0, (requestPageNumber - 1) * pageSize + events.length - 1);

    } else {

      sliceEvents = _.slice(concatEvents, 0, index);
    }

    sliceEvents.forEach(e => {
      if (_.includes(ROS_STATUS_FAILED, e.Status)) {

        console.error(red(e.StatusReason));

        const url = `https://ros.console.aliyun.com/#/stack/${region}`;
        throw new Error(`\nDeploy failed, you can login to ${url} to see deploy logs.\n`);
      }
    });

    const complete = sliceEvents.filter(s => {
      return _.includes(ROS_STATUS_COMPLETE, s.Status);
    });

    const firstEvent = _.first(sliceEvents);

    isComplete = firstEvent.ResourceType === ROS_RESOURCE_TYPE && _.includes(ROS_STATUS_COMPLETE, firstEvent.Status);

    if (isComplete) {

      _.remove(complete, e => {

        return e.LogicalResourceId === stackName;
      });

      return {
        completed: isComplete,
        events: complete
      };
    }

    const logicalResourceIds = complete.map(c => c.LogicalResourceId);

    _.remove(sliceEvents, e => {

      return _.includes(logicalResourceIds, e.LogicalResourceId) && !_.includes(ROS_STATUS_COMPLETE, e.Status);
    });

    return {
      completed: isComplete,
      events: sliceEvents
    };

  } while (!isComplete && totalCount && pageNumber && pageNumber * pageSize < totalCount);
}