function buildAnimation( data ) {

      var tracks = [];

      var channels = data.channels;
      var samplers = data.samplers;
      var sources = data.sources;

      for ( var target in channels ) {

        if ( channels.hasOwnProperty( target ) ) {

          var channel = channels[ target ];
          var sampler = samplers[ channel.sampler ];

          var inputId = sampler.inputs.INPUT;
          var outputId = sampler.inputs.OUTPUT;

          var inputSource = sources[ inputId ];
          var outputSource = sources[ outputId ];

          var animation = buildAnimationChannel( channel, inputSource, outputSource );

          createKeyframeTracks( animation, tracks );

        }

      }

      return tracks;

    }