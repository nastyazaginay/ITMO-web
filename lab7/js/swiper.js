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
        slidesPerView: 2,
        spaceBetween: 20
      },
    },
  });

  const clothingItems = document.querySelectorAll('.clothing-item');
  anime({
    targets: clothingItems,
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(300),
    duration: 800,
    easing: 'easeInOutBack',
    complete: function(anim) {
      clothingItems.forEach(item => item.classList.add('show'));
    }
  });
});
