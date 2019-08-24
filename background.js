// vs code format: Shift + Alt + F
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: "<all_urls>" },
                })
            ],
            actions: [
                new chrome.declarativeContent.ShowPageAction()
            ]
        }])
    })
})

chrome.runtime.onMessage.addListener(function (msg, _, response) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {
        var url = tabs[0].url
        chrome.storage.sync.get(['url'], function (urlResult) {
            console.log(url)
            console.log(urlResult.url)
            if (url.includes(urlResult.url)) {
                chrome.storage.sync.get(['js'], function (jsResult) {
                    if (jsResult.js) {
                        chrome.tabs.executeScript({
                            code: jsResult.js
                        })
                    }
                })
            }
        })
    })
})
// https://www.jianshu.com/p/a133cb1544d3
// www.jianshu.com