// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { fetchBooks } from '../services/booksService';
// import BookList from '../components/BookList';

// const Home = ({ navigation }) => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const loadBooks = async () => {
//       const booksData = await fetchBooks();
//       setBooks(booksData);
//     };
//     loadBooks();
//   }, []);

//   const navigateToBookDetail = (bookId) => {
//     navigation.navigate('BookDetail', { bookId });
//   };

//   return (
//     <View style={styles.container}>
//       <BookList books={books} onPressDetails={navigateToBookDetail} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
// });

// export default Home;

// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { fetchBooks } from '../services/booksService';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) {
    return <Text>Loading books...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.author}>by {item.author}</Text>
            <Button
              title="Details"
              onPress={() => navigation.navigate('Book Detail', { bookId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  bookItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  bookName: { fontSize: 18, fontWeight: 'bold' },
  author: { color: 'gray' },
});

export default HomeScreen;
