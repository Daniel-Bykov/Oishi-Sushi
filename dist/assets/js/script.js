document.addEventListener('DOMContentLoaded', function () {

  let likeButt = document.querySelectorAll('.popular-add-like', '.item-box-add-like');

  likeButt.forEach((item, index) => {
    item.addEventListener('click', () => {
      item.classList.toggle("is-active");
      let likesCount = item.children[1].textContent;
      const inc = item.classList.contains("is-active") ? 1 : -1;
      const heart = item.classList.contains("is-active") ? "./assets/img/favorite/like-active.svg" : "./assets/img/favorite/like.svg";
      item.children[0].src = heart;
      item.children[1] = item.children[1].textContent = +likesCount + inc;
    })
  })

  let favorite = document.querySelectorAll('.popular-icons__favorite');

  favorite.forEach((item, index) => {
    item.addEventListener('click', () => {
      item.classList.toggle("is-active");
      const star = item.classList.contains("is-active") ? "./assets/img/favorite/star-active.svg" : "./assets/img/favorite/star.svg";
      item.style.backgroundImage = "url(" + star + ")"
    })
  })
  
  let plus = document.querySelectorAll('.item-info__plus');
  let minus = document.querySelectorAll('.item-info__minus');
  let item_counter = document.querySelectorAll('.item-info__counter');

  plus.forEach((item, index) => {
    item.addEventListener('click', () => {
      item_counter[index].textContent = +item_counter[index].textContent + 1;
    })
  })

  minus.forEach((item, index) => {
    item.addEventListener('click', () => {
      item_counter[index].textContent = +item_counter[index].textContent - 1;
      if (item_counter[index].textContent <= 1) item_counter[index].textContent = 1;
    })
  })

  let addOrder = document.querySelectorAll('.item-info-button');
  let price = document.querySelectorAll('.item-text__price');
  let basketPrice =  document.querySelector('.header-button__text');
 
  addOrder.forEach((item, index) => {
    item.addEventListener('click', () => {
     console.log(price[index].textContent.replace(/₽/g, '') )
      basketPrice.textContent = +(basketPrice.textContent.replace(/₽/g, '')) + (+(price[index].textContent.replace(/₽/g, ''))*item_counter[index].textContent) + " ₽";
    })
  })


let filterButton = document.querySelectorAll(".filter-type__button")
let filterDropDown = document.querySelector(".filter-drop-down")
let filter = document.querySelector(".filter")
let filterCurrent = document.querySelector(".filter-current")


while(filterDropDown){
filterDropDown.addEventListener('click', () =>{
  filter.classList.toggle('filter-open'); 
})
}
  
  filterButton.forEach((item,index) =>{
      item.addEventListener('click', () =>{
        filterButton.forEach((item,index) =>{
          item.classList.remove('filter-active');
          if(item.classList.contains('filter-active'))
          item.firstChild.style.display = "block";
          else item.firstChild.style.display = "none";}) 
        item.classList.toggle('filter-active'); 
        filterCurrent.textContent = item.textContent;

        if(item.classList.contains('filter-active'))
          item.firstChild.style.display = "block";
          else item.firstChild.style.display = "none";
      })
  })
   



let naviButton = document.querySelectorAll('.pages-navigation-button');
    naviButton.forEach((item, index) => {
      item.addEventListener('click', () => {
        naviButton.forEach((item, index) => {
          item.classList.remove('pages-navigation-button--active'); 
        })
        item.classList.toggle('pages-navigation-button--active'); 

      })

    })

    let input = document.querySelectorAll(".personal-data__input");
    
    input.forEach((item, index) => {

      item.addEventListener('change', () => {
        console.log(item.value);
        if(item.value === ""){ item.style.border = '2px solid #F5F5F5', item.style.backgroundImage = "unset";}
        else item.style.border = '2px solid #4CBE66', item.style.backgroundImage = "url(./assets/img/create-order/tick.svg)";
        ;
      })
      })
});

