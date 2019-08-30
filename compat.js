function getBrowser() {
    let info = navigator.userAgent.toLowerCase()
    if (info.indexOf('chrome') > -1) {
        return chrome
    } else if (info.indexOf('firefox') > -1) {
        return browser
    }

    return null
}