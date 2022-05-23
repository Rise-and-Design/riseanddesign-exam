
// closing settings on mobile and tablet view
$(".burger-toggle").click(function () {
    $(".navigation").toggleClass("navigation-open");
    $(".burger-bar-top").toggleClass("burger-top");
    $(".burger-bar-middle").toggleClass("burger-middle");
    $(".burger-bar-bottom").toggleClass("burger-bottom");
});


// Scroll animation
// Inspiration form: https://alvarotrigo.com/blog/css-animations-scroll/

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
    } else {
        reveals[i].classList.remove("active");
    }
    }
}

window.addEventListener("scroll", reveal);