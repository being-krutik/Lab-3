import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookList = ({ books, onPressDetails, onPressBorrow }) => {
  return (
    <View>
      {books.map((book) => (
        <View key={book.id} style={styles.bookItem}>
          <Text>{book.name}</Text>
          <Button title="Details" onPress={() => onPressDetails(book.id)} />
          <Button title="Borrow" onPress={() => onPressBorrow(book.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    marginBottom: 10,
  },
});

export default BookList;
