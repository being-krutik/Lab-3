// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
// import { returnBook } from '../services/booksService';

// const BorrowedBooks = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);

//   useEffect(() => {
//     // Here you would fetch borrowed books from a local state or storage
//   }, []);

//   const handleReturn = (bookId) => {
//     returnBook(bookId, setBorrowedBooks);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={borrowedBooks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.bookItem}>
//             <Text>{item.name}</Text>
//             <Button title="Return Book" onPress={() => handleReturn(item.id)} />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   bookItem: {
//     marginBottom: 10,
//   },
// });

// export default BorrowedBooks;

// screens/BorrowedBooksScreen.js
// screens/BorrowedBooksScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// import { fetchBorrowedBooks, returnBook } from '../services/booksService';

// const BorrowedBooksScreen = ({ userId }) => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     const loadBorrowedBooks = async () => {
//       try {
//         const books = await fetchBorrowedBooks(userId);
//         setBorrowedBooks(books || []);
//       } catch (error) {
//         console.error("Error fetching borrowed books: ", error);
//       } finally {
//         setLoading(false); // Set loading to false when books are fetched
//       }
//     };

//     loadBorrowedBooks();
//   }, [userId]);

//   const handleReturn = (bookId) => {
//     returnBook(bookId, userId, setBorrowedBooks);
//   };

//   if (loading) {
//     return <Text>Loading...</Text>; // Show loading message
//   }

//   return (
//     <View style={styles.container}>
//       {borrowedBooks.length === 0 ? (
//         <Text>No borrowed books</Text>
//       ) : (
//         <FlatList
//           data={borrowedBooks}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.bookItem}>
//               <Text style={styles.bookName}>{item.name}</Text>
//               <Button title="Return Book" onPress={() => handleReturn(item.id)} />
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   bookItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
//   bookName: { fontSize: 18 },
// });

// export default BorrowedBooksScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { fetchBorrowedBooks, returnBook } from '../services/booksService';

const BorrowedBooks = ({ userId, navigation }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const loadBorrowedBooks = async () => {
      try {
        const books = await fetchBorrowedBooks(userId);
        setBorrowedBooks(books || []);
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      } finally {
        setLoading(false); // Set loading to false when books are fetched
      }
    };

    loadBorrowedBooks();
  }, [userId]);

  const handleReturn = (bookId) => {
    returnBook(bookId, userId, setBorrowedBooks);
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading message
  }

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text>No borrowed books</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookName}>{item.name}</Text>
              <Button title="Return Book" onPress={() => handleReturn(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  bookItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  bookName: { fontSize: 18 },
});

export default BorrowedBooks;

