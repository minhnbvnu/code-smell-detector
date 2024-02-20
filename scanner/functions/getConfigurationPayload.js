async function getConfigurationPayload(namespace, chatbotId) {
      return new Promise(function(resolve, reject) {
        Configuration.findOne({ where: compactObject({ namespace, chatbotId})})
          .then(
            response => {
              if (response == null || _.isEmpty(response.payload)) {
                // eslint-disable-next-line no-console
                console.log(`Configuration for ${node.namespace} not found`);
                return;
              }
              let configuration;
              try {
                configuration = JSON.parse(response.payload);
              } catch (e) {
                // eslint-disable-next-line no-console
                console.log('Invalid configuration payload')
              }

              const payload = _.omit(configuration, 'namespace');
              resolve(payload);
            },
            reject
          );
      });
    }