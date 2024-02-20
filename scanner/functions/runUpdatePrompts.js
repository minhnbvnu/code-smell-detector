function runUpdatePrompts() {
  const promptList = [
    {
      type: 'confirm',
      message: '是否更新<root>插件:',
      name: 'root',
      default: false,
    },
    {
      type: 'confirm',
      message: '是否更新<package>插件:',
      name: 'package',
      default: false,
    },
    {
      type: 'confirm',
      message: '是否更新<lint>插件:',
      name: 'lint',
      default: false,
    },
    {
      type: 'confirm',
      message: '是否更新<build>插件:',
      name: 'build',
      default: false,
    },
    {
      type: 'confirm',
      message: '是否更新<test>插件:',
      name: 'test',
      default: false,
    },
  ];
  return prompts(promptList);
}