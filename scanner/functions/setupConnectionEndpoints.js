function setupConnectionEndpoints() {
  return {
    preconnect: nockRequest('preconnect').reply(200, { return_value: TEST_DOMAIN }),
    connect: nockRequest('connect').reply(200, { return_value: { agent_run_id: RUN_ID } }),
    settings: nockRequest('agent_settings', RUN_ID).reply(200, { return_value: [] })
  }
}