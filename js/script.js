/*==========================================================================================================================================================================*/
/* Проверка браузера на поддержку формата webp */
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector("body").classList.add("_webp");
    } else {
        document.querySelector("body").classList.add("_no-webp");
    }
});



/*==========================================================================================================================================================================*/
/* Slider Swiper */
window.onload = function () {
    if (document.querySelector(".page-content__slider")) {
        let screenSlider = new Swiper(".page-content__slider", {
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '</span>';
                },
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
            autoHeight: true,
            initialSlide: 1,
            speed: 1200,
            slidesPerView: 1,
            centeredSlides: true,
        });
        let sliderBullets = document.querySelectorAll(".swiper-pagination span");
        let massiveNameBullets = ["_icon-gallery", "_icon-home", "_icon-about"];
        for (let i = 0; i < sliderBullets.length; i++) {
            let sliderBullet = sliderBullets[i];
            sliderBullet.classList.add(massiveNameBullets[i]);
        }
        screenSlider.on("transitionEnd", function () {
            let activeSlide = document.querySelector(".swiper-slide-active");
            let slides = document.querySelectorAll(".swiper-slide");
            for (let i = 0; i < slides.length; i++) {
                let slide = slides[i];
                if (slide.classList.contains("_show")) {
                    slide.classList.remove("_show");
                }
                activeSlide.classList.add("_show");
            }
        })
    }
}



/*==========================================================================================================================================================================*/
/* Text Animation */
let textBlock = document.querySelector(".text-main__letters");
let text = textBlock.innerText;
let textBlockInner = "";
let count = 0;
let timeout = 0;
for (i = 0; i < text.length; i++) {
    textBlockInner += "<span>" + text[i] + "</span>";
}
textBlock.innerHTML = textBlockInner;


setTimeout(() => {
    function typingText() {
        let spansTextBlock = textBlock.querySelectorAll("span");
        spansTextBlock[count].classList.add("_visible");
        if (spansTextBlock[count].innerText == " " || spansTextBlock[count].innerHTML == " ") {
            timeout = Math.floor(Math.random() * Math.floor(1000));
            spansTextBlock[count].classList.add("_cursor");
        } else {
            timeout = 40;
        }
        if (count < text.length - 1) {
            setTimeout(() => {
                spansTextBlock[count].classList.remove("_cursor");
                count++;
                typingText();
            }, timeout);
        }
    }
    typingText();
}, 1200);



/*==========================================================================================================================================================================*/
/* Works. Progressbar */
let worksBlock = document.querySelector(".works-page__gallery");
let worksBlockHeight = document.querySelector(".works-page__gallery").scrollHeight;
worksBlock.onscroll = function () {
    let progressBar = document.querySelector(".works-page__progressbar");
    let totalHeight = worksBlockHeight - worksBlock.clientHeight;
    let progressScroll = (worksBlock.scrollTop / totalHeight) * 468;
    progressBar.style.height = progressScroll + "px";
}