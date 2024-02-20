async function handlerUploadClick() {
  // 动态加载 upload 模块，该模块的 default 属性就是 upload 方法
  const { default: upload } = await import("./upload");
  // 调用 upload 方法
  upload();
}