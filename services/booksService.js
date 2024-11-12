// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase'; // Firebase config

// Fetch all books from Firestore

// // Borrow a book - Add to borrowed books list
// export const borrowBook = async (bookId, setBorrowedBooks) => {
//   try {
//     const bookRef = doc(db, 'books', bookId);
//     const bookSnapshot = await getDoc(bookRef);
//     const bookData = bookSnapshot.data();
//     setBorrowedBooks((prev) => [...prev, { id: bookId, ...bookData }]);
//   } catch (error) {
//     console.error('Error borrowing book: ', error);
//   }
// };

// // Return a book - Remove from borrowed books list
// export const returnBook = (bookId, setBorrowedBooks) => {
//   setBorrowedBooks((prev) => prev.filter((book) => book.id !== bookId));
// };
// services/booksService.js
// services/booksService.js
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebase'; // Import Firestore database instance
import { arrayUnion, arrayRemove } from 'firebase/firestore'; // Import arrayUnion and arrayRemove for managing arrays in Firestore

const MAX_BORROW_LIMIT = 3;

export const fetchBooks = async () => {
  const querySnapshot = await getDocs(collection(db, 'books'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchBookById = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId); // Reference to the specific book document
    const bookSnapshot = await getDoc(bookRef); // Fetch the book document

    if (bookSnapshot.exists()) {
      return { id: bookSnapshot.id, ...bookSnapshot.data() }; // Return book data if it exists
    } else {
      throw new Error('Book not found');
    }
  } catch (error) {
    console.error("Error fetching book by ID: ", error);
    throw error;
  }
};
// Borrow book function
export const borrowBook = async (bookId, userId, setIsBorrowed, setBorrowedBooks) => {
  try {
    const borrowedBooksRef = doc(db, 'users', userId); // Reference to the user's document in Firestore
    const borrowedBooksSnapshot = await getDoc(borrowedBooksRef); // Fetch the user's borrowed books

    const currentBorrowedBooks = borrowedBooksSnapshot.exists()
      ? borrowedBooksSnapshot.data().borrowedBooks || [] // Get borrowedBooks array or an empty array
      : [];

    // Check if user has exceeded borrow limit
    if (currentBorrowedBooks.length >= MAX_BORROW_LIMIT) {
      alert("You cannot borrow more than 3 books at a time.");
      return;
    }

    // Update Firebase: Add the book to the user's borrowed books
    await updateDoc(borrowedBooksRef, {
      borrowedBooks: arrayUnion(bookId), // Add bookId to borrowedBooks array
    });

    // Update local state to reflect the new borrowed book
    setIsBorrowed(true);
    setBorrowedBooks([...currentBorrowedBooks, bookId]);
  } catch (error) {
    console.error("Error borrowing book: ", error);
    alert("An error occurred while borrowing the book.");
  }
};

// Fetch books from Firestore
export const fetchBorrowedBooks = async (userId) => {
  try {
    const borrowedBooksRef = doc(db, 'users', userId);  // Reference to the user's document
    const borrowedBooksSnapshot = await getDoc(borrowedBooksRef);  // Fetch the document

    if (borrowedBooksSnapshot.exists()) {
      return borrowedBooksSnapshot.data().borrowedBooks || [];
    } else {
      return [];  // Return an empty array if no borrowed books are found
    }
  } catch (error) {
    console.error("Error fetching borrowed books: ", error);
    return [];
  }
};

// Return book function
// export const returnBook = async (bookId, userId, setIsBorrowed, setBorrowedBooks) => {
//   try {
//     const borrowedBooksRef = doc(db, 'users', userId); // Reference to the user's document in Firestore
//     const borrowedBooksSnapshot = await getDoc(borrowedBooksRef); // Fetch the user's borrowed books

//     const currentBorrowedBooks = borrowedBooksSnapshot.exists()
//       ? borrowedBooksSnapshot.data().borrowedBooks || [] // Get borrowedBooks array or an empty array
//       : [];

//     // Remove book from borrowedBooks in Firebase
//     await updateDoc(borrowedBooksRef, {
//       borrowedBooks: arrayRemove(bookId), // Remove bookId from borrowedBooks array
//     });

//     // Update local state to reflect the returned book
//     setIsBorrowed(false);
//     setBorrowedBooks(currentBorrowedBooks.filter((book) => book !== bookId));
//   } catch (error) {
//     console.error("Error returning book: ", error);
//     alert("An error occurred while returning the book.");
//   }
// };
// export const fetchBorrowedBooks = async (userId) => {
//   try {
//     const response = await fetch(`https://your-api.com/borrowedBooks/${userId}`);
//     if (response.ok) {
//       return await response.json();
//     }
//     throw new Error('Failed to fetch borrowed books');
//   } catch (error) {
//     console.error("Error fetching borrowed books: ", error);
//     return [];
//   }
// };


export const returnBook = async (bookId, userId, setIsBorrowed, setBorrowedBooks) => {
  try {
    const borrowedBooksRef = doc(db, 'users', userId); // Reference to the user's document in Firestore
    const borrowedBooksSnapshot = await getDoc(borrowedBooksRef); // Fetch the user's borrowed books

    if (!borrowedBooksSnapshot.exists()) {
      alert("User not found or no borrowed books.");
      return;
    }

    const currentBorrowedBooks = borrowedBooksSnapshot.data().borrowedBooks || []; // Get the list of borrowed books

    // Check if the book is in the list of borrowed books
    if (!currentBorrowedBooks.includes(bookId)) {
      alert("This book was not borrowed.");
      return;
    }

    // Update Firebase: Remove the book from the user's borrowed books
    await updateDoc(borrowedBooksRef, {
      borrowedBooks: arrayRemove(bookId), // Remove bookId from borrowedBooks array
    });

    // Update local state to reflect the book being returned
    setIsBorrowed(false);
    setBorrowedBooks(currentBorrowedBooks.filter(book => book !== bookId));
  } catch (error) {
    console.error("Error returning book: ", error);
    alert("An error occurred while returning the book.");
  }
};