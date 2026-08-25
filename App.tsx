import OpenPaySend from '@opentech-com/openpay-send';
import { StyleSheet, Text, View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FilledButton } from './components/FilledButton';
import { LandingIllustration } from './components/LandingIllustration';
import { InfoBanner } from './components';

export default function App() {
  return (
    <SafeAreaProvider>
      <SystemBars style="dark" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <LandingIllustration />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              <Text style={styles.titleDark}>Welcome to{'\n'}</Text>
              <Text style={styles.titleBlue}>Demo Hosting App</Text>
            </Text>
            <Text style={styles.description}>
              Demo Hosting App is a simplified example of a banking or card
              issuer application integrating the OpenPay Send Plug-in. This
              screen also previews the host app's branding and design system —
              including typography, colors, components, and illustration style —
              which are reflected throughout the plugin experience to ensure a
              seamless transition between contexts.
            </Text>
          </View>

          <View style={styles.footer}>
            <InfoBanner message="You're in the hosting app" />

            <FilledButton
              title="Send Money"
              onPress={async () => {
                try {
                  // In the current integration stage, both the launch target 'payment_with_alias_resolution'
                  // and the host_authorization_jwt are not evaluated, any value can be used.
                  await OpenPaySend.opbpLaunch('payment_with_alias_resolution', {
                    host_authorization_jwt: 'xxx-host_authorization_jwt-here-xxx',
                  });
                } catch (e) {
                  console.error('opbpLaunch error', e);
                }
              }}
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
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  illustration: {
    width: '80%',
    aspectRatio: 282 / 205,
  },
  textContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  titleDark: {
    color: '#0D3142',
  },
  titleBlue: {
    color: '#529AF7',
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
    lineHeight: 20,
  },
  footer: {
    marginBottom: 20,
    gap: 36,
  },
});
