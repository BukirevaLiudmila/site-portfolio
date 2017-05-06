function isVisible(elem) {
    var coords = elem.getBoundingClientRect();
    var windowHeight = document.documentElement.clientHeight;
    var topVisible = coords.top > 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}

function showVisible() {
    var progressBars = document.getElementsByClassName('progress-bar');
    for (let i = 0; i < progressBars.length; i++) {
        var bar = progressBars[i];
        var showed = bar.getAttribute('data-showed');
        if (showed == 'true') continue;
        if (isVisible(bar)) {
            bar.setAttribute('style', 'width: ' + bar.getAttribute('aria-valuenow') + '%');
            bar.setAttribute('data-showed', 'true');
        }
    }

}

window.onscroll = showVisible;
showVisible();