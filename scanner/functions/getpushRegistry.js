async function getpushRegistry(image, pushRegistry, region, configImage) {
  const imageArr = image.split('/');
  if (pushRegistry === 'acr-internet') {
    imageArr[0] = `registry.${region}.aliyuncs.com`;
    image = imageArr.join('/');
  } else if (pushRegistry === 'acr-vpc') {
    imageArr[0] = `registry-vpc.${region}.aliyuncs.com`;
    image = imageArr.join('/');
  } else if (pushRegistry) {
    imageArr[0] = pushRegistry;
    image = imageArr.join('/');
  }
  console.log(`docker tag ${configImage} ${image}`);
  execSync(`docker tag ${configImage} ${image}`, {
    stdio: 'inherit'
  });
  console.log(`docker push ${image}`);
  execSync(`docker push ${image}`, {
    stdio: 'inherit'
  });
}