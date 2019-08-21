// vs code format: Shift + Alt + F
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'www.baidu.com' },
                })
            ],
            actions: [
                new chrome.declarativeContent.ShowPageAction()
            ]
        }]);
    });
    // chrome.webNavigation.onCompleted.addListener(function () {
    //     alert("webNavigation.onCompleted")
    // }, { url: { urlMatches: '<all_urls>' } })
});
