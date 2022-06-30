//Book class:
class Book {
  constructor(title, Author, isbn) {
    this.title = title;
    this.Author = Author;
    this.isbn = isbn;
  }
}

//UI class:
class UI {
  static displayBooks() {  

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
      const div = document.createElement('div');

      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));

      const container = document.querySelector('.container');
      const form = document.querySelector("#book-form");

      container.insertBefore(div, form);

      //vanish in 3 sec
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
    }
    
}
//store class:
class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];

        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSOn.stringify(books));
        
    }

    static removeBook(isbn) {
        const books = store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }

}


//Display books:
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Add a Book:
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields....","danger");
  } else {
    const book = new Book(title, author, isbn);

      UI.addBookToList(book);

      //add book to store
      //store.addBook(book);
      
      UI.showAlert('Book Added', 'success');

    UI.clearFields();
  }
});

//Remove a Book:

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    
    UI.showAlert('Book removed', 'success')
});
