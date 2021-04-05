var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      
    },
    allowTouchMove:false,
    breakpoints: {

      1300: {
        allowTouchMove:true
      }
    }

  });


  var swiperPopular = new Swiper('.swiper-container-popular', {
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      dragSize:142,
      draggable: true,
      snapOnRelease: false,
      
    },
    mousewheel: true,
    slidesPerView: 4,
    loop: true,
    spaceBetween: 18,
    width: 1620,    
    allowTouchMove:true,

    breakpoints: {
      // when window width is >= 320px
      1280: {
        slidesPerView: 4,
        width: 1620,  
        allowTouchMove:false,
      },

      490: {
        slidesPerView: 4,
        width: 1200,  
        spaceBetween: 18,
      },

      320: {
        allowTouchMove:true,
        slidesPerView: 2,
        width: 484,  
      },
    }
  });