import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

type FilledButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
};

export function FilledButton({ title, onPress, color = '#00BDE8', textColor = '#FFFFFF', style }: FilledButtonProps) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});
