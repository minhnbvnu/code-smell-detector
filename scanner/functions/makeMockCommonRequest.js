function makeMockCommonRequest(t, test, type) {
    return (opts, _agent, cb) => {
      t.equal(_agent, agent)
      setImmediate(
        cb,
        null,
        JSON.stringify(
          type === 'aws'
            ? {
                instanceId: test.input_aws_id,
                instanceType: test.input_aws_type,
                availabilityZone: test.input_aws_zone
              }
            : type === 'azure'
            ? {
                location: test.input_azure_location,
                name: test.input_azure_name,
                vmId: test.input_azure_id,
                vmSize: test.input_azure_size
              }
            : type === 'gcp'
            ? {
                id: test.input_gcp_id,
                machineType: test.input_gcp_type,
                name: test.input_gcp_name,
                zone: test.input_gcp_zone
              }
            : null
        )
      )
    }
  }