import { StyleSheet, Text, View } from 'react-native';
import { InfoIcon } from './InfoIcon';

type InfoBannerProps = {
  message: string;
};

export function InfoBanner({ message }: InfoBannerProps) {
  return (
    <View style={styles.container}>
      <InfoIcon />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#0D3142',
  },
});
