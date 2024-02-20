function ChromeStorageManager(props) {
    classCallCheck_default()(this, ChromeStorageManager);
    /**
    **  More details: https://developer.chrome.com/extensions/storage
    **
    **  Property limit between storage.sync and storage.local in QUOTA_BYTES:
    **  QUOTA_BYTES_PER_ITEM prop in storage.sync is 8,192 and
    **  QUOTA_BYTES prop in storage.sync is 102,400,
    **  which indicates the maximum total amount (in bytes) of data that can be stored in sync storage.sync.
    **  Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
    **
    **  QUOTA_BYTES prop in storage.local is 5,242,880,
    **  which indicates the maximum amount (in bytes) of data that can be stored in local storage,
    **  as measured by the JSON stringification of every value plus every key's length.
    */
    this.storageFn = props.useChromeStorageSyncFn ? window.chrome.storage.sync : window.chrome.storage.local;
  }