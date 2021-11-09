const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav ul li");

check();

function check() {
    document.querySelectorAll('header').forEach(value => {
        value.style.background = !$(window).scrollTop ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.80)";
    })

    let current = "";

    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionMiddle = sectionTop - (section.offsetHeight / 2);

        if (pageYOffset >= sectionMiddle) {
            current = section.getAttribute("id");
        }
    }

    navLi.forEach((li) => {
        li.firstChild.classList.remove("active");
        if (li.firstChild.attributes.href.value.includes(current)) {
            li.firstChild.classList.add("active");
        }
    });
}


$('nav ul').click(function () {
    if ($('header').hasClass("is-active")) {
        menu_toggle();
    }
})

window.onscroll = check;
