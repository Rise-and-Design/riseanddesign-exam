
// closing settings on mobile and tablet view
$(".burger-toggle").click(function () {
    $(".navigation").toggleClass("navigation-open");
    $(".burger-bar-top").toggleClass("burger-top");
    $(".burger-bar-middle").toggleClass("burger-middle");
    $(".burger-bar-bottom").toggleClass("burger-bottom");
});

// Testimonials Carousel 


// Close newsletter popup

const closeNewsBtn = document.querySelector("[data-close-news]");
const newsPopup = document.querySelector(".newsletter-popup");
const newsPopupBackdrop = document.querySelector("[data-popup-backdrop]")

closeNewsBtn.addEventListener("click", (e) => {
    newsPopup.classList.add("newsletter-popup-closed");
    newsPopupBackdrop.classList.add("newsletter-popup-closed");
    setTimeout(function() {
        newsPopupBackdrop.classList.add("newsletter-popup-removed");
    }, 1000)
})

newsPopupBackdrop.addEventListener("click", (e) => {
    newsPopup.classList.add("newsletter-popup-closed");
    newsPopupBackdrop.classList.add("newsletter-popup-closed");
    setTimeout(function() {
        newsPopupBackdrop.classList.add("newsletter-popup-removed");
    }, 1000)
});

//Newsletter popup only shows if not in LocalStorage

// $j(document).ready(function() {
//     if(localStorage.getItem('popState') != 'shown'){
//         document.body.innerHTML =
            
//         $j('.newsletter-popup').delay(2000).fadeIn();
//         localStorage.setItem('popState','shown')
//     }