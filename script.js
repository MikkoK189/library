const card = document.getElementById(0);
const bookContainer = document.getElementById("books");
const showButton = document
  .getElementById("addbook")
  .addEventListener("click", openForm);
const hideButton = document
  .getElementById("closeform")
  .addEventListener("click", closeForm);
const form = document.getElementById("myForm");
const finishedBooksStat = document.getElementById("finished");
const pagesReadStat = document.getElementById("pagesread");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  addBookToLibrary(
    elements["title"].value,
    elements["author"].value,
    elements["pages"].value,
    elements["read"].checked
  );
  event.target.reset();
});

let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
  let newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  updateBooks();
}

function removeBook(id) {
  if (id.target.parentElement.parentElement.classList.contains("card")) {
    let bookToRemove = id.target.parentElement.parentElement.id;
    myLibrary.splice(bookToRemove, 1);
    updateBooks();
    let elementToRemove = document.getElementById(myLibrary.length);
    elementToRemove.parentNode.removeChild(elementToRemove);
    updateReadStat();
  }
}

function updateBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (document.getElementById(i)) {
      let bookCard = document.getElementById(i);
      bookCard.id = i;
      bookCard.querySelector("#title").textContent = myLibrary[i].title;
      bookCard.querySelector("#author").textContent = myLibrary[i].author;
      bookCard.querySelector(
        "#pages"
      ).textContent = `${myLibrary[i].pages} pages`;
      bookCard.querySelector("#read").checked = myLibrary[i].hasRead;
      bookCard.querySelector("#trash").addEventListener("click", removeBook);
      bookCard
        .querySelector("#read")
        .addEventListener("click", checkBoxChecked);
    } else {
      let bookCard = card.cloneNode(true);
      bookCard.id = i;
      bookCard.querySelector("#title").textContent = myLibrary[i].title;
      bookCard.querySelector("#author").textContent = myLibrary[i].author;
      bookCard.querySelector(
        "#pages"
      ).textContent = `${myLibrary[i].pages} pages`;
      bookCard.querySelector("#read").checked = myLibrary[i].hasRead;
      bookCard.querySelector("#trash").addEventListener("click", removeBook);
      bookCard
        .querySelector("#read")
        .addEventListener("click", checkBoxChecked);
      bookContainer.append(bookCard);
    }
  }
  updateReadStat;
}

function updateReadStat() {
  let readBooks = 0;
  let pagesRead = 0;

  myLibrary.forEach((book) => {
    if (book.hasRead) {
      readBooks += 1;
      pagesRead += parseInt(book.pages);
    }
  });

  finishedBooksStat.textContent = `Finished books: ${readBooks}`;
  pagesReadStat.textContent = `Pages read: ${pagesRead}`;
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function checkBoxChecked(event) {
  if (event.target.parentElement.classList.contains("card")) {
    let bookToChange = event.target.parentElement.id;
    myLibrary[bookToChange].hasRead = event.target.checked;
    console.log(myLibrary[bookToChange]);
    updateReadStat();
  }
}

card.parentNode.removeChild(card);
addBookToLibrary("Game of Thrones", "GRRM", 694, false);
