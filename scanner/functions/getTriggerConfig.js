function getTriggerConfig(triggerType, triggerProperties) {
  if (triggerType === 'Timer') {
    return {
      payload: triggerProperties.Payload,
      cronExpression: triggerProperties.CronExpression,
      enable: triggerProperties.Enable
    };
  } else if (triggerType === 'HTTP') {
    return {
      authType: (triggerProperties.AuthType).toLowerCase(),
      methods: triggerProperties.Methods
    };
  } else if (triggerType === 'Log') {
    const logConfig = triggerProperties.LogConfig;
    const jobConfig = triggerProperties.JobConfig;
    const sourceConfig = triggerProperties.SourceConfig;
    return {
      sourceConfig: {
        logstore: sourceConfig.Logstore
      },
      jobConfig: {
        maxRetryTime: jobConfig.MaxRetryTime,
        triggerInterval: jobConfig.TriggerInterval
      },
      logConfig: {
        project: logConfig.Project,
        logstore: logConfig.Logstore
      },
      functionParameter: triggerProperties.FunctionParameter || {},
      Enable: !(triggerProperties.Enable === false)
    };
  } else if (triggerType === 'RDS') {
    return {
      subscriptionObjects: triggerProperties.SubscriptionObjects,
      retry: triggerProperties.Retry,
      concurrency: triggerProperties.Concurrency,
      eventFormat: triggerProperties.EventFormat
    };
  } else if (triggerType === 'MNSTopic') {
    var notifyContentFormat = 'STREAM';
    if (triggerProperties.NotifyContentFormat !== undefined) {
      notifyContentFormat = triggerProperties.NotifyContentFormat;
    }
    var notifyStrategy = 'BACKOFF_RETRY';
    if (triggerProperties.NotifyStrategy !== undefined) {
      notifyStrategy = triggerProperties.NotifyStrategy;
    }
    var triggerCfg = {
      NotifyContentFormat: notifyContentFormat,
      NotifyStrategy: notifyStrategy
    };
    if (triggerProperties.FilterTag !== undefined) {
      triggerCfg.FilterTag = triggerProperties.FilterTag;
    }
    return triggerCfg;
  } else if (triggerType === 'TableStore') {
    return {};
  } else if (triggerType === 'OSS') {
    return {
      events: triggerProperties.Events || triggerProperties.events,
      filter: triggerProperties.Filter || triggerProperties.filter
    };
  } else if (triggerType === 'CDN') {
    return {
      eventName: triggerProperties.EventName,
      eventVersion: triggerProperties.EventVersion,
      notes: triggerProperties.Notes,
      filter: _.mapKeys(triggerProperties.Filter, (value, key) => {
        return _.lowerFirst(key);
      })
    };
  }
  console.error(`trigger type is ${triggerType} not supported.`);
}