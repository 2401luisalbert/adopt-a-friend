import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import { Text, View, StyleSheet } from 'react-native';

export function MyToast(props) {
  const { message, typeToast } = props;

  let icon = '';
  let backgroundColor = '';

  switch (typeToast) {
    case 'error':
      icon = 'times-circle';
      backgroundColor = '#D32F2F'; // Color rojo oscuro
      break;
    case 'success':
      icon = 'check-circle';
      backgroundColor = '#43A047'; // Color verde oscuro
      break;
    default:
      break;
  }

  const height = message.length > 40 ? 50 : 20;

  Toast.show(
    <View style={[styles.toastContainer, { height }]}>
      <Icon name={icon} size={20} color="#ffffff" style={styles.icon} />
      <Text style={styles.messageText}>{message}</Text>
    </View>,
    {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP + 40,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor,
      textColor: 'white',
      opacity: 1,
    }
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex:999
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    zIndex:999
  },
});
