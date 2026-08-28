import { registerRootComponent } from 'expo';
import OpenPaySend from '@opentech.com/openpay-send';

import App from './App';
import './ScaDelegate';

OpenPaySend.addListener('onSessionTokenRefreshRequired', ({ currentToken }) => {
  const newToken = `${currentToken}-renewed`;
  OpenPaySend.resolveSessionTokenRefresh(OpenPaySend.SESSION_REFRESH_RESULT_SUCCESS, newToken);
});

registerRootComponent(App);
