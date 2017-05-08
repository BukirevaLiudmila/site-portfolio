function isVisible(elem) {
    var coords = elem.getBoundingClientRect();
    var windowHeight = document.documentElement.clientHeight;
    var topVisible = coords.top > 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}

function showVisible() {
    var progressBars = document.getElementsByClassName('progress-bar');
    for (var i = 0; i < progressBars.length; i++) {
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

var edgeOffset = 0; // px
zenscroll.setup(null, edgeOffset);

function scroll(e) {
    var imgs = document.querySelectorAll('.circle > img');
    imgs.forEach((el) => {
        var attr = el.getAttribute('src');
        if (attr == './images/circle-active.png') {
            el.setAttribute('src', './images/circle.png')
        }
    });
    e.target.setAttribute('src', './images/circle-active.png');
    var to = e.target.getAttribute('data-scroll-to');
    var screen = document.getElementById(to);
    zenscroll.to(screen);
}

document.querySelectorAll('.circle').forEach(function (el) {
    el.addEventListener('click', scroll);
});