function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function getUrlKeys(callback) {
  chrome.storage.sync.get(["urlKeys"], function (keyResult) {
    if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
      return;
    }

    callback(keyResult.urlKeys)
  })
}

function getDataById(id, callback) {
  chrome.storage.sync.get([id], function (values) {
    if (isEmpty(values) || isEmpty(values[id])) {
      return
    }
    callback(values[id])
  });
}

function getJsByUrl(domain, callback) {
  chrome.storage.sync.get(["urlKeys"], function (keyResult) {
      if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
          return;
      }

      for (var i = 0, length = keyResult.urlKeys.length; i < length; i++) {
          let model = keyResult.urlKeys[i]
          if (model.url == domain) {
              let id = model.id
              chrome.storage.sync.get([id], function (values) {
                  let data = values[id];
                  let js = data.js;
                  callback(js)
              });
              return;
          }
      }
  })
}