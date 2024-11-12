// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator, Alert, Text } from 'react-native';
// import { fetchBooks, borrowBook, returnBook } from '../services/booksService';
// import BookDetails from '../components/BookDetails';

// const BookDetail = ({ route }) => {
//   const { bookId } = route.params; // Get bookId from navigation params
//   const [book, setBook] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const booksData = await fetchBooks(); // Fetch all books data
//         const selectedBook = booksData.find((book) => book.id === bookId);

//         console.log('Fetched Books Data:', booksData); // Log all books data
//         console.log('Selected Book:', selectedBook); // Log the selected book data

//         if (selectedBook) {
//           setBook(selectedBook); // Set the selected book in state
//         } else {
//           console.log('Book not found with ID:', bookId); // Log if book is not found
//         }
//       } catch (error) {
//         console.error('Error fetching book details:', error); // Log any errors
//       } finally {
//         setIsLoading(false); // Set loading state to false once fetching is complete
//       }
//     };

//     fetchBookDetails();
//   }, [bookId]);

//   const handleBorrow = () => {
//     if (borrowedBooks.length >= 3) {
//       Alert.alert('Limit reached', 'You can borrow up to 3 books.');
//     } else {
//       borrowBook(book.id, setBorrowedBooks);
//     }
//   };

//   const handleReturn = () => {
//     returnBook(book.id, setBorrowedBooks);
//   };

//   // Show loading spinner while data is being fetched
//   if (isLoading) {
//     return <ActivityIndicator size="large" />;
//   }

//   // Render the book details when book data is available
//   return (
//     <View style={{ flex: 1 }}>
//       {book ? (
//         <BookDetails
//           book={book}
//           onBorrow={handleBorrow}
//           onReturn={handleReturn}
//           isBorrowed={borrowedBooks.some((b) => b.id === book.id)}
//         />
//       ) : (
//         <Text>Book not found</Text>
//       )}
//     </View>
//   );
// };

// export default BookDetail;


// screens/BookDetail.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
// import { fetchBookById, borrowBook, returnBook, fetchBorrowedBooks } from '../services/booksService';

// const BookDetail = ({ route, navigation, userId }) => {
//   const { bookId } = route.params;
//   const [book, setBook] = useState(null);
//   const [isBorrowed, setIsBorrowed] = useState(false);
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     const loadBook = async () => {
//       try {
//         const fetchedBook = await fetchBookById(bookId);
//         setBook(fetchedBook);
//       } catch (error) {
//         console.error("Error fetching book: ", error);
//       } finally {
//         setLoading(false); // Stop loading when data is fetched
//       }
//     };

//     const loadBorrowedBooks = async () => {
//       try {
//         const books = await fetchBorrowedBooks(userId);
//         setBorrowedBooks(books || []);
//         setIsBorrowed(books?.includes(bookId)); // Check if bookId is in borrowedBooks
//       } catch (error) {
//         console.error("Error fetching borrowed books: ", error);
//       }
//     };

//     loadBook();
//     loadBorrowedBooks();
//   }, [bookId, userId]);

//   const handleBorrow = () => {
//     borrowBook(bookId, userId, setIsBorrowed, setBorrowedBooks);
//   };

//   const handleReturn = () => {
//     returnBook(bookId, userId, setIsBorrowed, setBorrowedBooks);
//   };

//   if (loading) {
//     return <Text>Loading...</Text>; // Show loading message
//   }

//   if (!book) {
//     return <Text>Book not found</Text>; // Error message if no book is found
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: book.coverImage || 'https://via.placeholder.com/150' }} style={styles.cover} />
//       <Text style={styles.title}>{book.name}</Text>
//       <Text style={styles.author}>by {book.author}</Text>
//       <Text style={styles.rating}>Rating: {book.rating}</Text>
//       <Text style={styles.summary}>{book.summary}</Text>
//       <Button
//         title={isBorrowed ? 'Return Book' : 'Borrow Book'}
//         onPress={isBorrowed ? handleReturn : handleBorrow}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, alignItems: 'center' },
//   cover: { width: 150, height: 225, marginBottom: 10 },
//   title: { fontSize: 24, fontWeight: 'bold' },
//   author: { fontSize: 18, marginVertical: 5 },
//   rating: { fontSize: 16, color: 'gray' },
//   summary: { marginVertical: 10, textAlign: 'center' },
// });

// export default BookDetail;


import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { fetchBookById, borrowBook, returnBook, fetchBorrowedBooks } from '../services/booksService';

const BookDetail = ({ route, navigation, userId }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch book details
  useEffect(() => {
    const loadBook = async () => {
      try {
        const fetchedBook = await fetchBookById(bookId);
        setBook(fetchedBook);
      } catch (error) {
        console.error("Error fetching book: ", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    loadBook();
  }, [bookId]);

  // Fetch borrowed books
  useEffect(() => {
    const loadBorrowedBooks = async () => {
      try {
        const books = await fetchBorrowedBooks(userId);
        setBorrowedBooks(books || []);  // Ensure borrowedBooks is an array
        setIsBorrowed(books?.some(book => book.id === bookId));  // Safely check if the book is borrowed
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      }
    };

    loadBorrowedBooks();
  }, [bookId, userId]);

  const handleBorrow = async () => {
    try {
      await borrowBook(bookId, userId);  // Assume this updates the borrowed books list
      setBorrowedBooks(prevBooks => [...prevBooks, book]); // Add borrowed book to the list
      setIsBorrowed(true);  // Mark the book as borrowed
      navigation.navigate('BorrowedBooks');  // Navigate to BorrowedBooksScreen
    } catch (error) {
      console.error("Error borrowing book: ", error);
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(bookId, userId);  // Assume this updates the borrowed books list
      setBorrowedBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));  // Remove book from the list
      setIsBorrowed(false);  // Mark the book as returned
    } catch (error) {
      console.error("Error returning book: ", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading message
  }

  if (!book) {
    return <Text>Book not found</Text>; // Error message if no book is found
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.coverImage || 'https://via.placeholder.com/150' }} style={styles.cover} />
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <Button
        title={isBorrowed ? 'Return Book' : 'Borrow Book'}
        onPress={isBorrowed ? handleReturn : handleBorrow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  cover: { width: 150, height: 225, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  author: { fontSize: 18, marginVertical: 5 },
  rating: { fontSize: 16, color: 'gray' },
  summary: { marginVertical: 10, textAlign: 'center' },
});

export default BookDetail;