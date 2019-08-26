// vs code format: Shift + Alt + F

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        var domain = extractDomain(tab.url);
        getJsByUrl(domain, function (js) {
            chrome.tabs.executeScript(tab.id, { code: js });
        });
    }
});

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
