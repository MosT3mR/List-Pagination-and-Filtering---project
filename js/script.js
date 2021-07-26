/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Student : Othman Alomair
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


function showPage(list, page){
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentUl = document.querySelector('.student-list');
   studentUl.innerHTML = '';
   for(let i=0; i < list.length; i++){
      if( i >= startIndex && i < endIndex){
         const studentLi = document.createElement('li');
         studentLi.className = 'student-item cf';
         studentUl.appendChild(studentLi);
         studentLi.insertAdjacentHTML('beforeend', `
         <div class="student-details">
         <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
         <h3>${list[i].name.first} ${list[i].name.last}</h3>
         <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${list[i].registered.date}</span>
         </div>
         `);
      }
   }
   
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/


function addPagination(list, thefunction){ // i changed the function so i can use it in search and the home page

   const pageList = Math.ceil(list.length / 9);
   const pageUl = document.querySelector('.link-list');
   pageUl.innerHTML = '';
   if (list.length !== 0) { // to make sure there is result 
   for(let i = 0; i < pageList; i++){
      const pageLi = document.createElement('li');
      const pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.innerHTML = i + 1;
      pageUl.appendChild(pageLi);
      pageLi.appendChild(pageButton);
   }
   pageUl.firstChild.firstChild.className = 'active';
   pageUl.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
         const button = e.target;
         const lastActive = document.querySelector('.active');
         lastActive.className = '';
         button.className = 'active';
         thefunction(data,button.textContent);
      }
   });
}
}

/*
Create the `searchList` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const header = document.querySelector('.header').firstElementChild;
const searchFrom = header.insertAdjacentHTML('afterend',`
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name..." onkeyup="searchFunction(data)">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`); // onkeyup for the searchfunction

const searchUl = document.querySelector('.link-list');
function searchFunction(list, page = 1) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentUl = document.querySelector('.student-list');
   const searchInput = document.getElementById('search').value.toUpperCase();
   studentUl.innerHTML = '';
   const filteringNames = []; // storing the result in arrey
   for(let i=0; i < data.length; i++){
      const searchFilter = data[i].name.first + ' ' + data[i].name.last; // searching thruo the data object
      if (searchFilter.toLocaleUpperCase().indexOf(searchInput) > -1){
      filteringNames.push(`
      <div class="student-details">
      <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
      <h3>${data[i].name.first} ${data[i].name.last}</h3>
      <span class="email">${data[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${data[i].registered.date}</span>
      </div>
      `);
       }
   }
   for(let i=0; i < filteringNames.length; i++){
      if( i >= startIndex && i < endIndex){
      const studentLi = document.createElement('li');
      studentLi.className = 'student-item cf';
      studentUl.appendChild(studentLi);
      studentLi.insertAdjacentHTML('beforeend', filteringNames[i]);
      }
   }

   if(filteringNames.length === 0){ // if there is no result in the search
      const noSearch = document.createElement('div');
      studentUl.appendChild(noSearch);
      noSearch.className = 'no-results';
      noSearch.innerHTML = `
      <div>
      <h3>No results have been found.</h3>
      </div>`;
   }
   return filteringNames; // to return the list outside of the function
}






// Call functions
showPage(data,1);
addPagination(data,showPage);
const searchKey = document.getElementById('search');
searchKey.addEventListener('keyup', (e) => {
   addPagination(searchFunction(),searchFunction);
});
