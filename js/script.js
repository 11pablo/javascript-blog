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
  /* [DONE ]add class 'active' to the clicked link */
  console.log('clickedElement', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href'); /*zwraca wartość atrybutu href */
  console.log(articleSelector);
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE]add class 'active' to the correct article*/ 
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optArticleAuthorSelector= '.post-author',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  /*console.log(articles);*/
  for (let article of articles){
    /*let html = '';*/
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id'); 
    /*console.log('article id:' + articleId);*/
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*console.log('title article:' + articleTitle);*/
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /*console.log('code link:' + linkHTML);*/
    /* [DONE] insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    /* html = html + linkHTML;
    console.log(html);*/
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();








function generateTags(){
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector); 
  /*console.log(articles);*/
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){  
    /*console.log(article);*/
    /*[DONE] find tags wrapper*/ 
    const tagList = article.querySelector(optArticleTagsSelector); 
    /*console.log(tagList);*/
    /* [DONE] make html variable with empty string */
    let html = ' ';
    /*[DONE]get tags from data-tags attribute*/ 
    const articleTags = article.getAttribute('data-tags'); 
    /*console.log(articleTags);*/
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' '); 
    /*console.log(articleTagsArray);*/
    /* [DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){ 
      /*console.log(tag);*/
      /* [DONE] generate HTML of the link */
      html = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp</span></a></li>'; 
      /*console.log(html);*/
      /* [DONE] add generated code to html variable */
      tagList.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    
  /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /*console.log(href);*/
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); 
  /*console.log(tag);*/
  /* [DONE]find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /*console.log(activeTagLinks);*/
  /*[DONE] START LOOP: for each active tag link */
  for (let tagLink of activeTagLinks) { 
    /*console.log(tagLink);*/
    /* remove class active */
    tagLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
  }
  /* [DONE]find all tag links with "href" attribute equal to the "href" constant */
  const linksToTagHref = document.querySelectorAll('a[href="' + href + '"]');
  /*console.log(linksToTagHref);*/
  /* [DONE] START LOOP: for each found tag link */
  for (let linkToTagHref of linksToTagHref) {
    /*console.log(linkToTagHref);*/
    /* [DONE] add class active */ //dodaj klasę aktywną
    linkToTagHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}



function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const LinksToTag = document.querySelectorAll('a[href^="#tag-"]'); 
  /*console.log(LinksToTag);*/
  /* [DONE]START LOOP: for each link */ 
  for (let link of LinksToTag){  
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /*console.log(link);*/
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();










function generateAuthors(){
  /* [DONE]find all articles */
  const articles = document.querySelectorAll(optArticleSelector); 
  /*console.log(articles);*/
  /* [DONE] START LOOP: for every article: */
  for (let article of articles){  
    /*console.log(article);*/
    /*[DONE] find tags wrapper*/ 
    const authorList = article.querySelector(optArticleAuthorSelector); 
    /*console.log(authorList);*/
    /* [DONE] make html variable with empty string */
    let linkhtml = ' ';
    /*[DONE]get tags from data-tags attribute*/ 
    const authorTag = article.getAttribute('data-author');
    /*console.log(authorTag);*/
    /* [DONE] generate HTML of the link */
    linkhtml = '<a href="#author-' + authorTag + '"><span>' + authorTag + '</span></a>';
    /*console.log(html);*/
    /* [DONE] add generated code to html variable */
    authorList.insertAdjacentHTML('beforeend', linkhtml);
    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    
  /* END LOOP: for every article: */
  }
}

generateAuthors();



function authorClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /*console.log(href);*/
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', ''); 
  /*console.log(author);*/
  /* find all tag links with class active */
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /*console.log(activeAuthorsLinks);*/
  /* [DONE] START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorsLinks) { 
    /*console.log(activeAuthorLink);*/
    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorsLinks = document.querySelectorAll('a[href="' + href + '"]');
  /*console.log(authorsLinks);*/
  /* [DONE] START LOOP: for each found tag link */
  for (let authorLink of authorsLinks) {
    /*console.log(linkToTagHref);*/
    /* [DONE] add class active */ //dodaj klasę aktywną
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthor(){
  /* [DONE]find all links to tags */
  const LinksToTag = document.querySelectorAll('a[href^="#author-"]'); 
  /*console.log(LinksToTag);*/
  /*[DONE] START LOOP: for each link*/ 
  for (let link of LinksToTag){  
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /*console.log(link);*/
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();


