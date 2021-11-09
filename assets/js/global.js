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
// add class to target users with js or no js
// —————————————————————————————————————————————————————
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");


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

document.addEventListener("DOMContentLoaded", function (event) {

    // ——————————————————————————————————————————————————
    // hamburger nav
    // ——————————————————————————————————————————————————
    var menu = document.querySelector('.main-header__nav > ul');

    function toggleNav() {
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


    $('#navToggle').click(function () {
        toggleNav();
    });

    videoControl();

    barba.init({
        transitions: [{
            name: 'default',
            leave(data) {
                return gsap.to(data.current.container, {
                    ease: Power4.easeInOut,
                    opacity: 0,
                    display: "none",
                    duration: .5,
                });
            },
            enter(data) {
                return gsap.fromTo(
                    data.next.container,
                    {
                        ease: Power4.easeInOut,
                        opacity: 0,
                    },
                    {
                        delay: 1,
                        opacity: 1,
                        duration: .5,
                    }
                );
            },
        }]
    });

    barba.hooks.enter((data) => {
        // —————————————————————————————————————————
        // U P D A T E   N A V - A C T I V E
        // —————————————————————————————————————————
        let nextItem = data.next.url.path;
        let menu = document.querySelectorAll(".main-header__nav__link");
        let currentPermalink = window.location.pathname;
        let currentPermalinkSplit = currentPermalink.split("/");
        let currentParentPage = "/" + currentPermalinkSplit[1] + "/";

        // for each menu item, run the active class update function
        menu.forEach((link) => {
            // remove all active classes
            link.classList.remove("active");
            // add active class to the link
            if (link.pathname == nextItem) {
                link.classList.add("active");
            } else if (link.attributes.href.nodeValue == currentParentPage) {
                link.classList.add("active");
            }
        });
    });


    Barba.Dispatcher.on('newPageReady', function (current, container) {
        history.scrollRestoration = 'manual';
    });


    // —————————————————————————————————————————————————————
    // scroll events 
    // —————————————————————————————————————————————————————
    $(window).scroll(function () {

    });


    // —————————————————————————————————————————————————————
    // search dropdown
    // —————————————————————————————————————————————————————
    var clicked = false;

    $('#toggleSearch').click(function () {
        toggleBtnClick();
    });

    $('#searchClose').click(function () {
        toggleBtnClick();
    });

    function toggleBtnClick() {
        if (clicked) {
            $('#searchContainer').addClass('search--hide');
            clicked = false;
        } else {
            $('#searchContainer').removeClass('search--hide');
            clicked = true;
            $('#s').focus();
        }
    }


    // ——————————————————————————————————————————————————
    // hamburger nav
    // ——————————————————————————————————————————————————
    var toggle = document.querySelector('#navToggle');
    var menu = document.querySelector('.main-header__nav >div');

    function toggleNav() {
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


    $('#navToggle').click(function () {
        toggleNav();
    });

}); // end document.ready