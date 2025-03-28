// —————————————————————————————————————————————————————
// Check browser & and inform user if it is out of date
// —————————————————————————————————————————————————————
var $buoop = {
    required: {
        e: -6,
        f: -6,
        o: -6,
        s: -4,
        c: -6
    },
    insecure: true,
    api: 2019.11
};

function $buo_f() {
    var e = document.createElement("script");
    e.src = "//browser-update.org/update.min.js";
    document.body.appendChild(e);
};
try {
    document.addEventListener("DOMContentLoaded", $buo_f, false)
} catch (e) {
    window.attachEvent("onload", $buo_f)
}

// —————————————————————————————————————————————————————
// is touch device
// —————————————————————————————————————————————————————
function is_touch_device() {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function (query) {
        return window.matchMedia(query).matches;
    }
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

// —————————————————————————————————————————————————————
// is keyboard user
// —————————————————————————————————————————————————————
(function () {
    'use strict';

    function keyboardFocus(e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                document.removeEventListener('keydown', keyboardFocus, false);
        }
    }

    document.addEventListener('keydown', keyboardFocus, false);
})();


// —————————————————————————————————————————————————————
// video controls
// —————————————————————————————————————————————————————
function videoControl() {
    var mediaVideo = $("#heroVideo").get(0);

    if (mediaVideo) {
        // play/pause on video click
        $('#videoControl').click(function () {
            if (mediaVideo.paused) {
                mediaVideo.play();
                this.classList.add("pause");
            } else {
                mediaVideo.pause();
                this.classList.remove("pause");
            }
        });
    }

    var mediaVideo2 = $("#ftPropertyVideo").get(0);
    if (mediaVideo2) {
        // play/pause on video click
        $('#ftPropertyVideoControl').click(function () {
            if (mediaVideo2.paused) {
                mediaVideo2.play();
                this.classList.add("pause");
            } else {
                mediaVideo2.pause();
                this.classList.remove("pause");
            }
        });
    }

    if (mediaVideo2 && mediaVideo) {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!mediaQuery || mediaQuery.matches) {

        } else {
            mediaVideo.setAttribute('autoplay', '');
            mediaVideo2.setAttribute('autoplay', '');
        }
    }
}

// ——————————————————————————————————————————————————
// hamburger nav
// ——————————————————————————————————————————————————
function toggleNav() {
    var menu = document.querySelector('.main-header__nav > ul');

    if (menu.classList.contains('is-active')) {
        $('#navToggle').attr('aria-expanded', 'false');
        menu.classList.remove('is-active');
    } else {
        menu.classList.add('is-active');
        $('#navToggle').attr('aria-expanded', 'true');
    }

    // set focus on first link within menu
    $('.main-header__nav >div >ul >li:first-child > a').focus();
}

// ——————————————————————————————————————————————————
// cursor follower
// this was removed from the site Feb 25, 2022
// ——————————————————————————————————————————————————
function cursorFollower() {
    var mouseX = window.innerWidth / 2,
        mouseY = window.innerHeight / 2;

    var circle = {
        el: $('#circle'),
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: 80,
        h: 80,
        update: function () {
            l = this.x - this.w / 2;
            t = this.y - this.h / 2;
            this.el.css({
                'transform':
                    'translate3d(' + l + 'px,' + t + 'px, 0)'
            });
        }
    }

    $(window).mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })

    setInterval(move, 1000 / 60)
    function move() {
        circle.x = lerp(circle.x, mouseX, 0.2);
        circle.y = lerp(circle.y, mouseY, 0.2);
        circle.update()
    }

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }

    // hover 
    function hoverFunc() {
        gsap.to(circle.el, 0.3, {
            height: "110px",
            width: "110px"
        });
    }

    function unhoverFunc() {
        gsap.to(circle.el, 0.3, {
            height: "80px",
            width: "80px",
            opacity: "1"
        });
    }

    function hideFunc() {
        gsap.to(circle.el, 0.3, {
            height: "0",
            width: "0",
            opacity: "0"
        });
    }

    if ($("button") != "") {
        $("button").hover(hoverFunc, unhoverFunc);
    } else { }

    if ($("a img") != "") {
        $("a img").hover(hoverFunc, unhoverFunc);
    } else { }

    if ($("a.link") != "") {
        $("a.link").hover(hoverFunc, unhoverFunc);
    } else { }

    if ($("a.button") != "") {
        $("a.button").hover(hoverFunc, unhoverFunc);
    } else { }

    if ($('.main-header__nav') != "") {
        $('.main-header__nav').hover(hideFunc, unhoverFunc);
    } else { }
}

// ——————————————————————————————————————————————————
// smoothscroll
// https://idiotwu.github.io/smooth-scrollbar/
// ——————————————————————————————————————————————————
function smoothscroll() {
    var Scrollbar = window.Scrollbar;
    var scrollWrapper = document.querySelector('#scrollWrapper');
    var scrollbar = Scrollbar.init(scrollWrapper, { damping: 0.09 });
    scrollbar;

    $('#scrollWrapper').css({
        'transform': 'auto',
        'width': '100vw',
        'height': '100vh'
    });
}

// ——————————————————————————————————————————————————
// target links that open in a new tab, add A11Y elements
// ——————————————————————————————————————————————————
function targetBlankA11Y() {
    var targetBlankLinks = document.getElementsByTagName('a');

    for (a in targetBlankLinks) {
        if (targetBlankLinks[a].target == '_blank') {
            var targetBlankLinksNode = document.createElement("span");
            var targetBlankLinksTextNode = document.createTextNode("(Opens a new window)");
            targetBlankLinksNode.appendChild(targetBlankLinksTextNode);
            targetBlankLinks[a].appendChild(targetBlankLinksNode);
        }
    }
}


document.addEventListener("DOMContentLoaded", function (event) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery || mediaQuery.matches) {
        // don't do the animations.
    } else {
        if (is_touch_device()) {
            videoControl();
        } else {
            smoothscroll();
            videoControl();
        }
    }

    targetBlankA11Y();

    // bio read more 
    if ($('.team__container__team-member button') != "") {
        $('.team__container__team-member button').click(function () {
            $(this).next().addClass("visible");
            $(this).hide();
        });
    }

    // ——————————————————————————————————————————————————
    // hamburger nav
    // ——————————————————————————————————————————————————
    $('#navToggle').click(function () {
        toggleNav();
    });

}); // end DOMContentLoaded