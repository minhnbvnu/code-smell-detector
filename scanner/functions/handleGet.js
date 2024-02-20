async function handleGet (request, env) {
  const hasStore = !!getStore(env)

  return new Response(
    `<html><body style="font-size: 24px; padding: 18px; font-family: Arial, sans-serif"">Hello from P2PCF<br/><div style=\"line-height: 28px; margin-top: 8px; font-size: 0.8em\">${
      hasStore
        ? '&#128077; R2 bucket is configured properly, ready to serve.'
        : '&#10060; Couldn\'t find a configured R2 bucket.<br/>Make sure you <a href="https://github.com/gfodor/p2pcf/blob/master/INSTALL.md#set-up-the-r2-bucket" target="_blank">created a bucket</a> and <a href="https://github.com/gfodor/p2pcf/blob/master/INSTALL.md#bind-the-worker-to-r2" target="_blank">connected the worker to it</a>.'
    }</div></body></html>`,
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  )
}