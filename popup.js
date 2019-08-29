let switchButton = document.getElementById("switch-button");
isOpen((isOpen) => {
    switchButton.checked = isOpen;
})
switchButton.addEventListener("click", function(e) {
    setIsOpen(e.target.checked)
});

let optionsButton = document.getElementById("options-button")
optionsButton.addEventListener("click", function(e) {
    openOptions()
})