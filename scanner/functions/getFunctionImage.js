async function getFunctionImage({ tpl, pushRegistry, region }) {
  for (const k of _.keys(tpl)) {
    const v = tpl[k];
    if (_.isObject(v)) {
      if (v.Type === 'Aliyun::Serverless::Function') {
        const { CustomContainerConfig = {} } = v.Properties || {};
        let image = CustomContainerConfig.Image;
        if (image) {
          await getpushRegistry(image, pushRegistry, region, CustomContainerConfig.Image);
        }
      } else {
        await getFunctionImage({ tpl: v, pushRegistry, region });
      }
    }
  }
}