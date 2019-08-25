const url_input_class = "input-url";
const checkbox_input_class = "input-checkbox";
const desc_input_class = "input-desc";
const js_input_class = "input-js";

initData();
initView();

function initData() {
  chrome.storage.sync.get(["urlKeys"], function(keyResult) {
    console.log(keyResult);
    console.log(isEmpty(keyResult.urlKeys));
    console.log(isEmpty(keyResult) || isEmpty(keyResult.urlKeys))
    if (isEmpty(keyResult) || isEmpty(keyResult.urlKeys)) {
      return;
    }

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

function initView() {
  let saveButton = document.getElementById("save");
  saveButton.addEventListener("click", function() {
    saveOptions();
  });
  let addButton = document.getElementById("add");
  addButton.addEventListener("click", function() {
    addOptions();
  });
  let deleteButton = document.getElementById("delete");
  deleteButton.addEventListener("click", function() {
    deleteOptions();
  });
}
/**
 * {
 *   urlKeys:[id-1, id-2, id-3...]
 * }
 * {
 *   id-1:{
 *     url: url-1
 *     js:js-1,
 *     desc:desc-1
 *   }
 * }
 * ...
 */
function saveOptions() {
  let lis = document.getElementById("menu").childNodes;
  let ids = [];

  lis.forEach(li => {
    let id = li.getAttribute("id");
    let url = li.getElementsByClassName(url_input_class)[0].value;
    let js = li.getElementsByClassName(js_input_class)[0].value;
    if (isEmpty(url) || isEmpty(js)) {
      return;
    }
    ids.push(id);
    let desc = li.getElementsByClassName(desc_input_class)[0].value;
    let data = {};
    data[id] = {
      url: url,
      desc: desc,
      js: js
    };

    chrome.storage.sync.set(data);
  });

  chrome.storage.sync.set({ urlKeys: ids });
}

function addOptions(id, url, desc, js) {
  let menu = document.getElementById("menu");
  if (menu.childNodes.length >= 20) {
    alert("超过限制");
    return;
  }
  let checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");
  checkInput.classList.add(checkbox_input_class);

  let urlInput = document.createElement("input");
  urlInput.classList.add(url_input_class);
  urlInput.setAttribute("placeholder", "url");
  if (!isEmpty(url)) {
    urlInput.value = url;
  }

  let descInput = document.createElement("input");
  descInput.classList.add(desc_input_class);
  descInput.setAttribute("placeholder", "description");
  if (!isEmpty(desc)) {
    descInput.value = desc;
  }

  let jsTextarea = document.createElement("textarea");
  jsTextarea.classList.add(js_input_class);
  jsTextarea.setAttribute("placeholder", "JS code");
  if (!isEmpty(js)) {
    jsTextarea.value(js);
  }
  let hr = document.createElement("hr");

  let li = document.createElement("li");
  if (isEmpty(id)) {
    li.setAttribute("id", getRandomId());
  } else {
    li.setAttribute("id", id);
  }

  li.appendChild(checkInput);
  li.appendChild(urlInput);
  li.appendChild(descInput);
  li.appendChild(jsTextarea);
  li.appendChild(hr);

  if (menu.childNodes.length == 0) {
    menu.appendChild(li);
  } else {
    menu.insertBefore(li, menu.childNodes[0]);
  }
}

function deleteOptions() {}

function getRandomId() {
  return Math.ceil(Math.random() * 1000000);
}

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}
