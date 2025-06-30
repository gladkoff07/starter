document.addEventListener("DOMContentLoaded", function () {

  // Fancybox init
  Fancybox.bind("[data-fancybox]", {
    animationEffect: "zoom-in-out",
    slideClass: "modal-close",
  })

  // Swiper init
  const swiperName = new slider.Swiper(".js-slider-name", {
    // configure Swiper to use modules
    modules: [slider.Navigation, slider.Pagination],

    slidesPerView: 2,
    roundLengths: true,
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
})
