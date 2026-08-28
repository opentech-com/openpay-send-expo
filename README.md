# OpenPay Send Expo Demo

## Install

1. The package is private on npm. Create a `.npmrc` in your project root:

```
//registry.npmjs.org/:_authToken=<THE_TOKEN>
```

replacing `<THE_TOKEN>` with the token provided by Opentech.

2. Install the package:

```bash
npm install @opentech.com/openpay-send
```

## Configuration

Place the SDK config files (provided by Opentech) in your project root, then add the plugin in `app.json`:

```json
{
  "plugins": [
    ["@opentech.com/openpay-send", {
      "androidConfigFile": "./openpaysend-android-config.json"
    }]
  ]
}
```

The Opentech Maven repository (`s3://openpay-plugin-store/maven/`) requires AWS
authentication. The config plugin reads the credentials (ask Opentech to obtain
them) from two environment variables, so they stay out of version control:

- `OPENPAY_ANDROID_REPO_ACCESS_KEY`
- `OPENPAY_ANDROID_REPO_SECRET_KEY`

If either variable is missing, `expo prebuild` fails fast with a clear error.

**Local builds** — create a `.env` file in your project root (the same folder as
`app.json`) with this content:

```sh
OPENPAY_ANDROID_REPO_ACCESS_KEY=<AWS_ACCESS_KEY>
OPENPAY_ANDROID_REPO_SECRET_KEY=<AWS_SECRET_KEY>
```

Add `.env` to your `.gitignore` so the keys are never committed. Expo loads it
automatically for `expo prebuild` / `expo run:android`. (If your setup doesn't
auto-load `.env`, export the two variables in your shell before building.)

**EAS / CI builds** — don't use a `.env`; register the two variables as
[EAS secrets](https://docs.expo.dev/build-reference/variables/) instead:

```sh
eas secret:create --name OPENPAY_ANDROID_REPO_ACCESS_KEY --value <AWS_ACCESS_KEY>
eas secret:create --name OPENPAY_ANDROID_REPO_SECRET_KEY --value <AWS_SECRET_KEY>
```

Run prebuild:

```bash
npx expo prebuild --platform android
```

## Usage

```ts
import OpenPaySend from '@opentech.com/openpay-send';

await OpenPaySend.opbpLaunch(target, params);
```

- `target`: `string | null`
- `params`: `Record<string, string>`

## SCA Delegate

Register a component named `OpenPaySendScaDelegate` **before** `registerRootComponent`:

```ts
// ScaDelegate.tsx
import { AppRegistry } from 'react-native';
import OpenPaySend from '@opentech.com/openpay-send';

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
import OpenPaySend from '@opentech.com/openpay-send';
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
