document.addEventListener('DOMContentLoaded', function () {



  //---------------------------Save Street DropDown

  let saveStreetButton = document.querySelector(".save-street-list")
  let saveStreet = document.querySelector(".save-street")
  let saveStreetCurrent = document.querySelector(".save-street-list__text")
  let saveStreetOptions = document.querySelectorAll(".save-street-list__text--options")
  let saveStreetOptionsBox = document.querySelector(".save-street-list__options")

  if (saveStreet != null) {
    saveStreetButton.addEventListener('click', () => {
      saveStreetOptionsBox.classList.toggle('save-street-list__options--open');
      saveStreetOptionsBox.classList.toggle('save-street-list__options--active');
      saveStreetButton.classList.toggle('save-street-list--active');
      saveStreetButton.classList.remove('save-street-list--open');
    })
  }

  saveStreetOptions.forEach((item, index) => {
    item.addEventListener('click', () => {

      if (item.textContent === "Указать другой адрес") {
        console.log(saveStreetButton)
        saveStreetButton.classList.remove('save-street-list--open');
        saveStreetCurrent.textContent = "Сохраненные адреса";
      }
      else saveStreetCurrent.textContent = item.textContent;
      saveStreetOptionsBox.classList.remove('save-street-list__options--open');

      if (item.textContent != "Указать другой адрес") {
        saveStreetButton.classList.add('save-street-list--open')
      }

      if (item.textContent != "Указать другой адрес") {
        let street = document.getElementById('street')
        let home = document.getElementById('home')
        let apartment = document.getElementById('apartment')
        street.className = "personal-data__input";
        home.className = "personal-data__input";
        apartment.className = "personal-data__input";
        street.value = "";
        home.value = "";
        apartment.value = "";
        street.disabled = true;
        home.disabled = true;
        apartment.disabled = true;
      }

      else {
        street.disabled = false;
        home.disabled = false;
        apartment.disabled = false;
      }
    })
  })

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
        item.classList.remove('filter-active');
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

  let continueOrder = document.querySelector(".order-continue");
  let personalData = document.querySelector(".order-personal-data");
  let orderList = document.querySelector(".order-list");
  let backOrderList = document.querySelector(".create-order-button--back");


  if (continueOrder != null) {
    continueOrder.addEventListener('click', () => {
      personalData.style.display = "block";
      orderList.style.display = "none";
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


  const enterToProfile = document.getElementById('header-button__profile')
  const popupEnterToProfile = document.querySelector('.enter-form-wrap')
  const closePopupEnterToProfile = document.querySelector('.enter-form__close')
  const enterForm = document.getElementById('enter-form')


  window.onclick = function (event) {
    if (event.target == enterForm) {
      console.log(enterForm)
      popupEnterToProfile.classList.remove("enter-form-wrap--open");
      const body = document.body;
      const scrollY = body.style.top;
      body.style.overflow = 'auto';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  enterToProfile.addEventListener('click', () => {
    popupEnterToProfile.classList.add("enter-form-wrap--open")
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.overflow = 'hidden';
    body.style.top = `-${scrollY}`;

    closePopupEnterToProfile.addEventListener('click', () => {
      popupEnterToProfile.classList.remove("enter-form-wrap--open")
      const body = document.body;
      const scrollY = body.style.top;
      body.style.overflow = 'auto';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);

    })

  })

  window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });


      //---------------------------Favorite & History Tabs

if(location.pathname==="/account.html"){
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

if(location.pathname==="/account.html"){
  console.log('account')
  tabs.init();
}

      //---------------------------Vacancy Tabs

let spoilerVacBut = document.querySelectorAll(".vacancy-item-box");
let spoilerBox = document.querySelectorAll(".vacancy-item-box");
let spoilerPlus = document.querySelectorAll(".vacancy-spoiler__plus");
let header = document.querySelectorAll(".vacancy-item-header");

spoilerVacBut.forEach((item,index) =>{
  item.addEventListener('click', () =>{
    spoilerBox.forEach((item,index) =>{
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

      let menuButton = document.querySelector(".header-menu");
      
      // let menuWrap = document.querySelector(".menu");
      let menu = document.querySelector(".menu-box");
      
        menuButton.addEventListener('click', () =>{
          // menuWrap.classList.toggle('menu--open')
          menu.classList.toggle('menu-box--open')
        })

});


