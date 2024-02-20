async function transformTracingConfig(tracingConfig) {
  if (tracingConfig === 'Enable') {
    const xtraceClient = await getXtraceClient();
    try {
      const { Token: token } = await xtraceClient.request('GetToken', {}, {});
      return {
        type: 'Jaeger',
        params: {
          endpoint: `${token.InternalDomain}/adapt_${token.LicenseKey}_${token.Pid}/api/traces`
        }
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
  return {};
}