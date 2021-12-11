'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
};

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
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optAuthorsListSelector = '.authors',
  optCloudClassPrefix = 'tag-size-';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    console.log(articleId);
    console.log(articleTitle);
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

/*create function calculateTagsParams*/
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for(let tag in tags){
    /*console.log(tag + ' is used ' + tags[tag] + ' times');*/
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

/*determining the size of tags*/
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
    let linkHTML = ' ';
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
      linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp</span></a></li>'; 
      /*console.log(html);*/
      /* [DONE] add generated code to html variable */
      tagList.insertAdjacentHTML('beforeend', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){ 
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  /*console.log('tagsParams:',tagsParams);*/
  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /*console.log(tag);*/
    /*[NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML +='<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '&nbsp</span></a></li>';
  }
  /*[NEW] END LOOP: for each tag in allTags: */
  
  /*[NEW] add html form allTagsHTML to tagList */
  tagList.insertAdjacentHTML('beforeend', allTagsHTML);
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
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
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
    let linkHtml = ' ';
    /*[DONE]get tags from data-tags attribute*/ 
    const authorTag = article.getAttribute('data-author');
    /*console.log(authorTag);*/
    /* [DONE] generate HTML of the link */
    linkHtml = '<a href="#author-' + authorTag + '"><span>' + authorTag + '</span></a>';
    /*console.log(html);*/
    /* [DONE] add generated code to html variable */
    authorList.insertAdjacentHTML('beforeend', linkHtml);
    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(authorTag)){ 
      /* [NEW] add tag to allTags object */
      allAuthors[authorTag] = 1;
    } else {
      allAuthors[authorTag]++;
    }
    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    
  /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  /*[NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /*[NEW] START LOOP: for each tag in allTags */
  for(let author in allAuthors){
    /*console.log(author);*/
    /*[NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsHTML +='<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')'+ '&nbsp</span></a></li>';
    /*console.log(allAuthorsHTML);*/
  }

  /*[NEW] add html form allTagsHTML to tagList */
  authorList.insertAdjacentHTML('beforeend', allAuthorsHTML);
  
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