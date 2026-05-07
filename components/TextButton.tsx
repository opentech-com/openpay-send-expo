import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

type TextButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
};

export function TextButton({ title, onPress, color = '#00BDE8', style }: TextButtonProps) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});
