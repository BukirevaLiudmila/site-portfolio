function sendMail() {
    var data = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };
    if (data.name.length > 0 && data.email.length > 0 && data.message.length > 0) {
        fetch('/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (x) {
                return x.json();
            })
            .then(function (x) {
                var sucsessBlock = document.querySelector('.sucsess-text');
                sucsessBlock.style.visibility = 'visible';
                setTimeout(function () {
                    sucsessBlock.style.visibility = 'hidden';
                }, 3000);
                return console.log(x);
            });
    } else {
        var errorBlock = document.querySelector('.error-text');
        errorBlock.style.visibility = 'visible';
        setTimeout(function () {
            errorBlock.style.visibility = 'hidden';
        }, 3000);
    }
    return false;
}

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
    var screens = document.querySelectorAll('.screen');
    var coordsMiddle = [];
    screens.forEach(function (elem) {
        var coords = elem.getBoundingClientRect();
        var middleScreen = (coords.top + coords.bottom) / 2 - document.documentElement.clientHeight / 2;
        coordsMiddle.push({
            coords: middleScreen,
            elem: elem.getAttribute('id')
        });
    });
    var activeScreen = coordsMiddle[0];
    coordsMiddle.forEach(function (elem) {
        if (Math.abs(elem.coords) < Math.abs(activeScreen.coords)) {
            activeScreen = elem;
        }
    });
    var imgs = document.querySelectorAll('.circle > img');
    imgs.forEach((el) => {
        var attr = el.getAttribute('data-scroll-to');
        if (attr == activeScreen.elem) {
            el.setAttribute('src', './images/circle-active.png');
        } else {
            el.setAttribute('src', './images/circle.png');
        }
    });
}

window.onscroll = showVisible;
showVisible();

var edgeOffset = 0; // px
zenscroll.setup(null, edgeOffset);

function scroll(e) {
    var imgs = document.querySelectorAll('.circle > img');
    var to = e.target.getAttribute('data-scroll-to');
    var screen = document.getElementById(to);
    zenscroll.to(screen);
}

document.querySelectorAll('.circle').forEach(function (el) {
    el.addEventListener('click', scroll);
});

slidr.create('slidr-id').start();