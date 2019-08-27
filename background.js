// vs code format: Shift + Alt + F

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        var domain = extractDomain(tab.url);
        getJsByUrl(domain, function (js) {
            chrome.tabs.executeScript(tab.id, { code: js });
        });
    }
});

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
