// Set the menuButton variable. And add a Click Event Listener to fire the menu_toggle functin.
let menuButton = document.querySelector('header button.hamburger');
menuButton.addEventListener('click', function () {
    menu_toggle()
});

// Menu toggle function
function menu_toggle() {
    // Set buttonEl and menuEl.
    let buttonEl = document.querySelector('header button.hamburger'),
        menuEl = document.querySelector('header nav ul'),
        header = document.querySelector('header');

    // Toggle is-active class.
    let toggled = buttonEl.classList.toggle('is-active');

    if (toggled) {
        disableScrolling();
    } else {
        enableScrolling()
    }

    menuEl.classList.toggle('is-active');
    header.classList.toggle('is-active');
}

function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(x, y);
    };
}

function enableScrolling() {
    window.onscroll = function () {
    };
}
