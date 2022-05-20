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

function newsletterPopupTimeout() {
    var myVar = setTimeout(showPage, 1000);
}

if(!localStorage.getItem("visited")){
    localStorage.setItem("visited",true);
    newsletterPopupTimeout();
}

function showPage() {
    $("#newsletter-popup").css("display","grid");
}