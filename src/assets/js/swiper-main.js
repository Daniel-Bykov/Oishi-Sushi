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
      draggable: true,
      snapOnRelease: false,
    },
    slidesPerView: 4,
    loop: true,
    spaceBetween: 18,
    width: 1620,    

    breakpoints: {
      // when window width is >= 320px
      1280: {
        slidesPerView: 4,
        width: 1620,  
      },

      490: {
        slidesPerView: 4,
        width: 1200,  
        spaceBetween: 18,
      },

      320: {
        slidesPerView: 2,
        width: 484,  
      },
    }
  });