function Webcam(uppy, opts) {
    var _this;

    _this = _Plugin.call(this, uppy, opts) || this;
    _this.mediaDevices = getMediaDevices();
    _this.supportsUserMedia = !!_this.mediaDevices;
    _this.protocol = location.protocol.match(/https/i) ? 'https' : 'http';
    _this.id = _this.opts.id || 'Webcam';
    _this.title = _this.opts.title || 'Camera';
    _this.type = 'acquirer';

    _this.icon = function () {
      return h("svg", {
        "aria-hidden": "true",
        focusable: "false",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32"
      }, h("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, h("rect", {
        fill: "#03BFEF",
        width: "32",
        height: "32",
        rx: "16"
      }), h("path", {
        d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
        fill: "#FFF",
        "fill-rule": "nonzero"
      })));
    };

    _this.defaultLocale = {
      strings: {
        smile: 'Smile!',
        takePicture: 'Take a picture',
        startRecording: 'Begin video recording',
        stopRecording: 'Stop video recording',
        allowAccessTitle: 'Please allow access to your camera',
        allowAccessDescription: 'In order to take pictures or record video with your camera, please allow camera access for this site.',
        noCameraTitle: 'Camera Not Available',
        noCameraDescription: 'In order to take pictures or record video, please connect a camera device',
        recordingStoppedMaxSize: 'Recording stopped because the file size is about to exceed the limit',
        recordingLength: 'Recording length %{recording_length}'
      }
    }; // set default options

    var defaultOptions = {
      onBeforeSnapshot: function onBeforeSnapshot() {
        return Promise.resolve();
      },
      countdown: false,
      modes: ['video-audio', 'video-only', 'audio-only', 'picture'],
      mirror: true,
      showVideoSourceDropdown: false,
      facingMode: 'user',
      preferredImageMimeType: null,
      preferredVideoMimeType: null,
      showRecordingLength: false
    };
    _this.opts = _extends({}, defaultOptions, opts);

    _this.i18nInit();

    _this.install = _this.install.bind(_assertThisInitialized(_this));
    _this.setPluginState = _this.setPluginState.bind(_assertThisInitialized(_this));
    _this.render = _this.render.bind(_assertThisInitialized(_this)); // Camera controls

    _this._start = _this._start.bind(_assertThisInitialized(_this));
    _this._stop = _this._stop.bind(_assertThisInitialized(_this));
    _this._takeSnapshot = _this._takeSnapshot.bind(_assertThisInitialized(_this));
    _this._startRecording = _this._startRecording.bind(_assertThisInitialized(_this));
    _this._stopRecording = _this._stopRecording.bind(_assertThisInitialized(_this));
    _this._oneTwoThreeSmile = _this._oneTwoThreeSmile.bind(_assertThisInitialized(_this));
    _this._focus = _this._focus.bind(_assertThisInitialized(_this));
    _this._changeVideoSource = _this._changeVideoSource.bind(_assertThisInitialized(_this));
    _this.webcamActive = false;

    if (_this.opts.countdown) {
      _this.opts.onBeforeSnapshot = _this._oneTwoThreeSmile;
    }

    _this.setPluginState({
      hasCamera: false,
      cameraReady: false,
      cameraError: null,
      recordingLengthSeconds: 0,
      videoSources: [],
      currentDeviceId: null
    });

    return _this;
  }