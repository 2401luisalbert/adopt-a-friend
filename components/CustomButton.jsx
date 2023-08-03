import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({ label, onPress, color = '#1e90ff', disabled = false }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width:"50%",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
});

export default CustomButton;
