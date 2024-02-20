function generateQuestions({
  accountId, defaultRegion,
  timeout, retries, enableCustomEndpoint,
  markedAccessKeyId, markedAccessKeySecret
}) {
  return [
    {
      type: 'input',
      name: 'accountId',
      message: 'Aliyun Account ID',
      default: accountId
    },
    {
      type: 'input',
      name: 'accessKeyId',
      message: 'Aliyun Access Key ID',
      default: markedAccessKeyId
    },
    {
      type: 'input',
      name: 'accessKeySecret',
      message: 'Aliyun Access Key Secret',
      default: markedAccessKeySecret
    },
    {
      type: 'list',
      name: 'defaultRegion',
      message: 'Default region name',
      choices: ['cn-qingdao', 'cn-beijing', 'cn-zhangjiakou',
        'cn-hangzhou', 'cn-shanghai', 'cn-shenzhen', 'cn-huhehaote',
        'cn-hongkong', 'cn-chengdu', 'ap-southeast-1', 'ap-southeast-2',
        'ap-south-1', 'ap-southeast-3', 'ap-southeast-5',
        'ap-northeast-1', 'us-west-1', 'us-east-1',
        'eu-central-1', 'eu-west-1'],
      default: defaultRegion
    },
    {
      type: 'input',
      name: 'timeout',
      message: 'The timeout in seconds for each SDK client invoking',
      default: timeout || 10,
      filter(value) {
        if (typeof value !== 'number') { value = parseInt(value); }
        if (!Number.isNaN(value)) { return value; }
        throw Error('timeout must be number');
      }
    },
    {
      type: 'input',
      name: 'retries',
      message: 'The maximum number of retries for each SDK client',
      default: retries || 3,
      filter(value) {
        if (typeof value !== 'number') { value = parseInt(value); }
        if (!Number.isNaN(value)) { return value; }
        throw Error('retries must be number');
      }
    },
    {
      type: 'confirm',
      name: 'report',
      message: 'Allow to anonymously report usage statistics to improve the tool over time?'
    },
    {
      type: 'list',
      name: 'enableCustomEndpoint',
      default: enableCustomEndpoint === true ? 'Yes' : 'No',
      message: 'Use custom endpoint?',
      choices: ['No', 'Yes']
    }
  ];
}