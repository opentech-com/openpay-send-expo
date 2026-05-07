import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OpenPaySend from '@opentech-com/openpay-send';
import { FilledButton } from './components/FilledButton';
import { InfoBanner } from './components/InfoBanner';
import { OutlineButton } from './components/OutlineButton';
import { TextButton } from './components/TextButton';

function ScaDelegate({ scaPayload }: { scaPayload?: string }) {
  const resolve = async (resultCode: number, token: string) => {
    try {
      await OpenPaySend.resolveScaRequest(resultCode, token);
    } catch (e) {
      console.error('resolveScaRequest error', e);
    }
  };

  return (
    <SafeAreaProvider>
      <SystemBars style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Demo Hosting App SCA solution</Text>
            <Text style={styles.description}>
              This screen represents the Demo Hosting App's Strong Customer
              Authentication (SCA) experience, used to simulate how a host
              banking or card issuer application may authorize transactions
              initiated through the OpenPay Send Plug-in.
            </Text>
          </View>

          <View style={styles.buttons}>
            <FilledButton
              title="SCA Authorized"
              onPress={() => resolve(OpenPaySend.SCA_RESULT_SUCCESS, `${scaPayload ?? ''}-signed`)}
            />
            <OutlineButton
              title="SCA Denied"
              onPress={() => resolve(OpenPaySend.SCA_RESULT_DENIED, '')}
            />
          </View>

          <View style={styles.footer}>
            <InfoBanner message="You're in the hosting app" />
            <TextButton
              title="Cancel"
              onPress={() => resolve(OpenPaySend.SCA_RESULT_CANCELLED, '')}
              style={styles.cancelButton}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#0D3142',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
  },
  buttons: {
    gap: 18,
  },
  footer: {
    marginBottom: 40,
    gap: 24,
    alignItems: 'center',
  },
  cancelButton: {
    marginBottom: 8,
  },
});

AppRegistry.registerComponent('OpenPaySendScaDelegate', () => ScaDelegate);

export default ScaDelegate;
