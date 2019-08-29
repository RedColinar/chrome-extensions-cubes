let actualBrowser = getBrowser()

function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

function extractDomain(url) {
    let domain;
    if (url.indexOf("://") > -1) {
        domain = url.split("/")[2];
    } else {
        domain = url.split("/")[0];
    }
    domain = domain.split(":")[0];
    return domain;
}

// https://www.jianshu.com/p/a133cb1544d3
// www.jianshu.com

function getUrlKeys(callback) {
    actualBrowser.storage.sync.get(["urlKeys"], function(keyResult) {
        if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
            return;
        }

        callback(keyResult.urlKeys)
    })
}

function getDataById(id, callback) {
    actualBrowser.storage.sync.get([id], function(values) {
        if (isEmpty(values) || isEmpty(values[id])) {
            return
        }
        callback(values[id])
    });
}

function getJsByUrl(domain, callback) {
    actualBrowser.storage.sync.get(["urlKeys"], function(keyResult) {
        if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
            return;
        }

        for (var i = 0, length = keyResult.urlKeys.length; i < length; i++) {
            let model = keyResult.urlKeys[i]
            if (model.url == domain) {
                let id = model.id
                actualBrowser.storage.sync.get([id], function(values) {
                    let data = values[id];
                    let js = data.js;
                    callback(js)
                });
                return;
            }
        }
    })
}

function saveToStorage(data) {
    actualBrowser.storage.sync.set(data);
}

function removeFromStorage(keys) {
    actualBrowser.storage.sync.remove(keys);
}

function isOpen(callback) {
    actualBrowser.storage.sync.get("isOpen", function(result) {
        // isEmpty(isOpen) || isOpen 表示已开启
        let isOpen = result.isOpen
        callback(isOpen)
    });
}

function setIsOpen(isOpen) {
    actualBrowser.storage.sync.set({ isOpen: isOpen });
}

function openOptions() {
    actualBrowser.runtime.openOptionsPage()
}

function addTabUpdatedListener() {
    actualBrowser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            isOpen(isOpen => {
                if (isOpen) {
                    var domain = extractDomain(tab.url);
                    getJsByUrl(domain, function(js) {
                        actualBrowser.tabs.executeScript(tab.id, { code: js });
                    });
                }
            })
        }
    });
}