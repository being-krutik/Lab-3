import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const BookDetails = ({ book, onBorrow, onReturn, isBorrowed }) => {
  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.detailsContainer}>
      <Image source={{ uri: book.coverImage || 'https://via.placeholder.com/150' }} style={styles.cover} />
      <Text style={styles.title}>{book.name || 'No Title Available'}</Text>
      <Text style={styles.text}>Author: {book.author || 'Unknown'}</Text>
      <Text style={styles.text}>Rating: {book.rating || 'N/A'}</Text>
      <Text style={styles.text}>{book.summary || 'No summary available for this book.'}</Text>

      <Button title={isBorrowed ? 'Return Book' : 'Borrow Book'} onPress={isBorrowed ? onReturn : onBorrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: 150,
    height: 225,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default BookDetails;
