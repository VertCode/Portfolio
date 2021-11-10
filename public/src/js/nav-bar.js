/*
  __  __           _        ____
 |  \/  |         | |      |  _ \
 | \  / | __ _  __| | ___  | |_) |_   _
 | |\/| |/ _` |/ _` |/ _ \ |  _ <| | | |
 | |  | | (_| | (_| |  __/ | |_) | |_| |
 |_|  |_|\__,_|\__,_|\___| |____/ \__, |
                                   __/ |
 __          __       _           |___/__                 _
 \ \        / /      | |            |  _ \               | |
  \ \  /\  / /__  ___| | ___ _   _  | |_) |_ __ ___ _   _| | _____ _ __ ___
   \ \/  \/ / _ \/ __| |/ _ \ | | | |  _ <| '__/ _ \ | | | |/ / _ \ '__/ __|
    \  /\  /  __/\__ \ |  __/ |_| | | |_) | | |  __/ |_| |   <  __/ |  \__ \
     \/  \/ \___||___/_|\___|\__, | |____/|_|  \___|\__,_|_|\_\___|_|  |___/
                              __/ |
                             |___/
*/
const topMenu = $("nav ul li");
const topMenuHeight = topMenu.outerHeight() + 15;
const menuItems = topMenu.find("a");
const scrollItems = menuItems.map(function () {
    const item = $($(this).attr("href"));
    if (item.length) {
        return item;
    }
});

check();

function check() {
    $(window).scroll(function () {
        const fromTop = $(this).scrollTop() + topMenuHeight;

        let cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop + 7)
                return this;
        });


        cur = cur[cur.length - 1];
        const id = cur && cur.length ? cur[0].id : "";

        for (let i = 0; i < menuItems.length; i++) {
            let menuItem = menuItems[i];
            if (menuItem.attributes.href.value.replace("#", "") === id)
                menuItem.classList.add("active");
            else if (menuItem.classList.contains("active"))
                menuItem.classList.remove("active")
        }

    });
}

$('nav ul').click(function () {
    if ($('header').hasClass("is-active")) {
        menu_toggle();
    }
})

window.onscroll = check;
