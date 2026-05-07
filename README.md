# OpenPay Send Expo Demo

## Install

1. Create a `.npmrc` in your project root:

```
@opentech-com:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

The token needs the `read:packages` scope.

2. Install the package:

```bash
npm install @opentech-com/openpay-send
```

## Configuration

Place the SDK config file (provided by Opentech) in your project root, then add the plugin in `app.json`:

```json
{
  "plugins": [
    ["@opentech-com/openpay-send", { "configFile": "./openpaysend-config.json" }]
  ]
}
```

Run prebuild:

```bash
npx expo prebuild --platform android
```

## Usage

```ts
import OpenPaySend from '@opentech-com/openpay-send';

await OpenPaySend.opbpLaunch(target, params);
```

- `target`: `string | null`
- `params`: `Record<string, string>`

## SCA Delegate

Register a component named `OpenPaySendScaDelegate` **before** `registerRootComponent`:

```ts
// ScaDelegate.tsx
import { AppRegistry } from 'react-native';
import OpenPaySend from '@opentech-com/openpay-send';

function ScaDelegate({ scaPayload }: { scaPayload?: string }) {
  // Present an authentication UI to the user. Use your SCA engine to sign the provided scaPayload.

  // On successful authorization, pass the signed token:
  await OpenPaySend.resolveScaRequest(OpenPaySend.SCA_RESULT_SUCCESS, signedToken);

  // If the user denies authorization:
  await OpenPaySend.resolveScaRequest(OpenPaySend.SCA_RESULT_DENIED, '');

  // If the user cancels:
  await OpenPaySend.resolveScaRequest(OpenPaySend.SCA_RESULT_CANCELLED, '');

  // On any other error:
  await OpenPaySend.resolveScaRequest(OpenPaySend.SCA_RESULT_GENERIC_ERROR, '');
}

AppRegistry.registerComponent('OpenPaySendScaDelegate', () => ScaDelegate);
```

## Session Token Refresh

Register the listener to renew the session token:

```ts
// index.ts (entry point)
import OpenPaySend from '@opentech-com/openpay-send';
import './ScaDelegate';

OpenPaySend.addListener('onSessionTokenRefreshRequired', ({ currentToken }) => {
  const newToken = // ... generate a fresh session token using currentToken if needed
  OpenPaySend.resolveSessionTokenRefresh(OpenPaySend.SESSION_REFRESH_RESULT_SUCCESS, newToken);

  // or in case of session expired:
  OpenPaySend.resolveSessionTokenRefresh(OpenPaySend.SESSION_REFRESH_RESULT_SESSION_EXPIRED, '');

  // or in case of error:
  OpenPaySend.resolveSessionTokenRefresh(OpenPaySend.SESSION_REFRESH_RESULT_GENERIC_ERROR, '');
});
```

## API

| Method | Description |
|--------|-------------|
| `opbpLaunch(target, params)` | Launch the SDK |
| `resolveScaRequest(resultCode, token)` | Complete SCA |
| `resolveSessionTokenRefresh(resultCode, newToken)` | Complete token refresh |

### Events

| Event | Payload |
|-------|---------|
| `onScaRequested` | `{ scaPayload: string }` |
| `onSessionTokenRefreshRequired` | `{ currentToken: string }` |
