document.addEventListener('DOMContentLoaded', function () {

  //---------------------------Filter DropDown

  let filterButton = document.querySelectorAll(".filter-type__button")
  let filterDropDown = document.querySelector(".filter-drop-down")
  let filter = document.querySelector(".filter")
  let filterCurrent = document.querySelector(".filter-current")


  if (filterDropDown != null) {
    filterDropDown.addEventListener('click', () => {
      filter.classList.toggle('filter-open');
    })
  }

  filterButton.forEach((item, index) => {
    item.addEventListener('click', () => {
      
      filterButton.forEach((item, index) => {

        if (item.classList.contains('filter-active'))
          item.firstChild.style.display = "block";
        else item.firstChild.style.display = "none";
      })

      item.classList.toggle('filter-active');
      filterCurrent.textContent = item.textContent;

      if (item.classList.contains('filter-active'))
        item.firstChild.style.display = "block";
      else item.firstChild.style.display = "none";
    })
  })

  //---------------------------Page Nagivagiton

  let naviButton = document.querySelectorAll('.pages-navigation-button');
  naviButton.forEach((item, index) => {
    item.addEventListener('click', () => {
      naviButton.forEach((item, index) => {
        item.classList.remove('pages-navigation-button--active');
      })
      item.classList.toggle('pages-navigation-button--active');

    })
  })

  //---------------------------Order Mobile Transition

  let continueOrder = document.querySelector(".basket-list__continue");
  let personalData = document.querySelector(".order-personal-data");
  let orderList = document.querySelector(".basket-list");
  let backOrderList = document.querySelector(".create-order-button--back");
  let mql = window.matchMedia('(max-width: 1600px)');

  if (continueOrder != null) {
    continueOrder.addEventListener('click', () => {
      personalData.classList.add('basket-list')
      personalData.style.display = "block";
      if (mql.matches) {
        orderList.style.display = "none";
    }
    })

    backOrderList.addEventListener('click', () => {
      personalData.style.display = "none";
      orderList.style.display = "block";
    })
  }

  //---------------------------Order Input Validation

  const form = document.querySelectorAll('.personal-data__input')
  const userName = document.getElementById('user-name')
  const phoneNumber = document.getElementById('phone-number')
  const street = document.getElementById('street')
  const home = document.getElementById('home')
  const apartment = document.getElementById('apartment')


  form.forEach((item, index) => {
    console.log(index)
    item.addEventListener('change', (e) => {
      e.preventDefault();
      console.log(item)
      item.сlassName = "personal-data__input";
      checkInputs(item);
    })
  })


  function checkInputs(item) {

    const inputOne = item.value.trim();

    if (item.id != "phone-number") {
      if (inputOne === "") {
        setErrorFor(item)
      }
      else {
        setSuccsessFor(item)
      }

    }
    else if (!validatePhone(inputOne)) {
      setErrorFor(item)
    }
    else {
      setSuccsessFor(item)
    }

  }

  function validatePhone(phone) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
  }

  function setErrorFor(input) {
    if (input.classList.contains("personal-data__input-succsess")) {
      input.classList.remove("personal-data__input-succsess")
    }
    input.classList.add('personal-data__input-error')
  }

  function setSuccsessFor(input) {
    if (input.classList.contains("personal-data__input-error")) {
      input.classList.remove("personal-data__input-error")
    }
    input.classList.add('personal-data__input-succsess')
  }

  //---------------------------Enter in Profile


  const enterToProfile = document.getElementById('header-buttons__account')
  const popupBlock = document.querySelector('.popup__block')
  const popupClose = document.querySelector('.popup__close')
  const popup = document.querySelector('.popup')
  const body = document.body;


  window.onclick = function (event) {
    if (event.target == popup) {
      console.log(popup)
      popupBlock.classList.remove("popup__block--open");
      popup.classList.remove("popup--open");
      const body = document.body;
      const scrollY = body.style.top;
      body.style.top = '';
      body.classList.remove('stop-scroll');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  enterToProfile.addEventListener('click', () => {
    popupBlock.classList.add("popup__block--open")
    popup.classList.add("popup--open");
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.top = `-${scrollY}`;
    body.classList.add('stop-scroll');

    popupClose.addEventListener('click', () => {
      popupBlock.classList.remove("popup__block--open")
      popup.classList.remove("popup--open");
      const body = document.body;
      const scrollY = body.style.top;
      body.style.top = '';
      body.classList.remove('stop-scroll');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    })

  })

  window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });

  //---------------------------Favorite & History Tabs

  if (location.pathname === "/account.html") {
    console.log('account')
  }

  let tabs = (function () {
    let tabsControl = document.querySelectorAll('.favorite-history-tab'),
      tabsContent = document.querySelectorAll('.favorite-history__items'),
      activeTab = tabsControl[0],
      activeIndex = 0,
      carret = document.querySelector('.favorite-history-carret'),

      init = () => {
        activeTab.classList.add('favorite-history-tab__active');
        tabsContent[activeIndex].classList.add('favorite-history-items-open');

        setTimeout(() => {
          setCarret();
          carret.classList.add('favorite-history-carret--ready')
        }, 200)

        tabsControl.forEach((item, index) => {
          item.addEventListener('click', () => {
            showTab(index);
          })
        });
      },

      setCarret = () => {
        carret.style.width = window.getComputedStyle(activeTab.firstElementChild).getPropertyValue("width")
        let offset = 0;

        [...tabsControl].slice(0, activeIndex).forEach(i => {
          offset += i.offsetWidth + +window.getComputedStyle(i).marginRight.match(/\d/g).join('')
        })

        carret.style.transform = `translate(${offset}px)`
      },

      showTab = (i) => {
        activeIndex = i;
        activeTab = tabsControl[activeIndex];

        setCarret();

        [...tabsControl, ...tabsContent].forEach(i => {
          i.classList.remove('favorite-history-tab__active', 'favorite-history-items-open');
        });

        activeTab.classList.add('favorite-history-tab__active');
        tabsContent[activeIndex].classList.add('favorite-history-items-open');
      };

    return {
      init
    }
  })();

  if (location.pathname === "/account.html") {
    console.log('account')
    tabs.init();
  }

  //---------------------------Vacancy Tabs

  let spoilerVacBut = document.querySelectorAll(".vacancy-item-box");
  let spoilerBox = document.querySelectorAll(".vacancy-item-box");
  let spoilerPlus = document.querySelectorAll(".vacancy-spoiler__plus");
  let header = document.querySelectorAll(".vacancy-item-header");

  spoilerVacBut.forEach((item, index) => {
    item.addEventListener('click', () => {
      spoilerBox.forEach((item, index) => {
        item.classList.add('vacancy-item-box__close')
        spoilerPlus[index].classList.add('vacancy-spoiler__plus--active')
        header[index].classList.add('vacancy-item-header__close')

      })
      spoilerBox[index].classList.toggle('vacancy-item-box__close')
      spoilerPlus[index].classList.remove('vacancy-spoiler__plus--active')
      header[index].classList.remove('vacancy-item-header__close')
    })
  })

  //---------------------------Menu Open

  let menuButton = document.querySelector(".menu-btn");

  let menu= document.querySelector(".mobile-menu__wrap");

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('mobile-menu__wrap--open')
  })

});


