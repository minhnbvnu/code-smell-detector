function testRule() {
  ruleTester.run('flow-fb-oss', rule, {
    valid: [
      {
        code: 'require("path");',
        filename: OSS_FILE_PATH_1,
      },
      {
        code: 'require("./util");',
        filename: OSS_FILE_PATH_1,
      },
      {
        code: '// $FlowFB\nrequire("./fb-file-1");',
        filename: OSS_FILE_PATH_1,
      },
      {
        code: '// $FlowFB\nrequire("./fb/file-2");',
        filename: OSS_FILE_PATH_1,
      },
      {
        code: 'require("./index");',
        filename: FB_FILE_PATH_1,
      },
      {
        code: 'require("./fb/fb-file-2");',
        filename: FB_FILE_PATH_1,
      },
    ],
    invalid: [
      {
        code: 'require("./fb-file-1");',
        filename: OSS_FILE_PATH_1,
        errors: [
          {
            message:
              'fb-only requires must have a line comment `// $FlowFB` above',
            type: 'CallExpression',
          },
        ],
      },
      {
        code: 'require("./fb/file-2");',
        filename: OSS_FILE_PATH_1,
        errors: [
          {
            message:
              'fb-only requires must have a line comment `// $FlowFB` above',
            type: 'CallExpression',
          },
        ],
      },
    ],
  });
}