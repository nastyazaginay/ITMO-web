document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 20
      },
    },
  });
});
