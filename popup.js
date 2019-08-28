let switchButton = document.getElementById("switch-button");

switchButton.addEventListener("click", function(e) {
  console.log(e.target.checked);
});

switchButton.checked = false;
