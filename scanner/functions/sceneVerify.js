async function sceneVerify({ ctx, scene }) {
  // params
  const module = scene.module || ctx.module.info.relativeName;
  const sceneName = scene.name;
  const captchaData = ctx.request.body[scene.dataKey || 'captcha'];
  const providerInstanceId = captchaData.providerInstanceId;
  const dataInput = captchaData.data;
  // verify
  try {
    await ctx.bean.captcha.verify({ module, sceneName, providerInstanceId, dataInput });
  } catch (err) {
    throw combineCaptchaError({
      fieldKey: scene.fieldKey || 'token',
      message: err.message,
    });
  }
}