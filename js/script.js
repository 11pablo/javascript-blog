'use strict';

function titleClickHandler(event){ //event- kliknięcie
  event.preventDefault(); /*wyłączenie hasha przewijania, adres się nie zmienia*/
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

  /* [IN DONE PROGRESS]add class 'active' to the clicked link */
  console.log('clickedElement', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href"); /*zwraca wartość atrybutu href */
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /*add class 'active' to the correct article*/ 
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}