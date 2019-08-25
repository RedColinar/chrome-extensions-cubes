function getJsInfoByDomain(domain, callback) {
  chrome.storage.sync.get(["urlKeys"], function(keyResult) {
    if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
      return;
    }

    let keys = keyResult.urlKeys
    for(var i = 0, len = keys.length; i < len; i++) { 
        keys[i]
    };　
    keyResult.urlKeys.forEach(id => {
      chrome.storage.sync.get([id], function(values) {
        let data = values[id];
        let url = data.url;
        let desc = data.desc;
        let js = data.js;
        addOptions(id, url, desc, js);
      });
    });
  });
}
