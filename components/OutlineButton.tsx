import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
};

export function OutlineButton({ title, onPress, color = '#00BDE8', style }: OutlineButtonProps) {
  return (
    <Pressable
      style={[styles.button, { borderColor: color }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});
