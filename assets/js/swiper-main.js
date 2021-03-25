var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


  var swiperPopular = new Swiper('.swiper-container-popular', {
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      dragSize:142,
      draggable: true
    },

    slidesPerView: 4,
    spaceBetween: 18,
  });