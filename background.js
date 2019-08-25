// vs code format: Shift + Alt + F
// chrome.runtime.onInstalled.addListener(function () {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [
//                 new chrome.declarativeContent.PageStateMatcher({
//                     pageUrl: { hostEquals: "<all_urls>" },
//                 })
//             ],
//             actions: [
//                 new chrome.declarativeContent.ShowPageAction()
//             ]
//         }])
//     })
// })

// chrome.runtime.onMessage.addListener(function (msg, _, response) {
//     var queryInfo = {
//         active: true,
//         currentWindow: true
//     };
//     chrome.tabs.query(queryInfo, (tabs) => {
//         var url = tabs[0].url
//         chrome.storage.sync.get(['url'], function (urlResult) {
//             console.log(url)
//             console.log(urlResult.url)
//             if (url.includes(urlResult.url)) {
//                 chrome.storage.sync.get(['js'], function (jsResult) {
//                     if (jsResult.js) {
//                         chrome.tabs.executeScript({
//                             code: jsResult.js
//                         })
//                     }
//                 })
//             }
//         })
//     })
// })

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    var domain = extractDomain(tab.url);
    getScript(domain, function(script) {
      chrome.tabs.executeScript(tab.id, { code: script });
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
