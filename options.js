let page = document.getElementById('buttonDiv');
let saveButton = document.getElementById('save');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function () {
            chrome.storage.sync.set({ color: item }, function () {
                console.log('color is ' + item);
            })
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonColors);

chrome.storage.sync.get(['url'], function (result) {
    console.log('get url is ' + result.url);
    document.getElementById('url-expected-1').value = result.url
})
chrome.storage.sync.get(['js'], function (result) {
    console.log('get js is ' + result.js);
    document.getElementById('js-expected-1').value = result.js
})

function saveOptions() {
    let url = document.getElementById('url-expected-1').value
    let js = document.getElementById('js-expected-1').value
    chrome.storage.sync.set({ 'url': url }, function () {
        console.log('save url is ' + url);
    })
    chrome.storage.sync.set({ 'js': js }, function () {
        console.log('save js is ' + js);
    })
}
saveButton.addEventListener('click', function () {
    saveOptions()
})