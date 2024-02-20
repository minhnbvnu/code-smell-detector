function assertSegments(test, baseSegment, isCLMEnabled) {
  const { agent } = test.context
  const { children } = helper.isSecurityAgentEnabled(agent) ? baseSegment.children[0] : baseSegment
  // TODO: once we drop v2 support, this function can be removed and assert inline in test below
  if (semver.satisfies(pkgVersion, '>=3')) {
    const [middieSegment, handlerSegment] = children
    test.clmAttrs({
      segments: [
        {
          segment: middieSegment,
          name: 'runMiddie',
          filepath: 'test/versioned/fastify/node_modules/middie/index.js'
        },
        {
          segment: handlerSegment,
          name: '(anonymous)',
          filepath: 'test/versioned/fastify/common.js'
        }
      ],
      enabled: isCLMEnabled
    })
  } else {
    const [middieSegment, mwSegment, handlerSegment] = children
    test.clmAttrs({
      segments: [
        {
          segment: middieSegment,
          name: 'testMiddleware',
          filepath: 'test/versioned/fastify/common.js'
        },
        {
          segment: mwSegment,
          name: 'pathMountedMiddleware',
          filepath: 'test/versioned/fastify/common.js'
        },
        {
          segment: handlerSegment,
          name: '(anonymous)',
          filepath: 'test/versioned/fastify/common.js'
        }
      ],
      enabled: isCLMEnabled
    })
  }
}