async function waitStackDeleted(rosClient, stackId, region, stackName) {
  let exist;
  do {
    exist = true;

    await time.sleep(500);

    const rs = await getStack(rosClient, stackId, region);
    const status = rs.Status;

    if (status === 'DELETE_COMPLETE') {
      exist = false;
    }

    console.log(`stack: '${stackName}' already deleted, waiting for status to be 'DELETE_COMPLETE', now is ${rs.Status}`);
  } while (exist);
}