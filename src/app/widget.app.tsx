import { Provider } from 'react-redux'
import {
  UIProvider,
  WalletProvider,
  AccountProvider,
  MintProvider,
  PoolProvider,
} from 'senhub/providers'

import { ConfigProvider } from 'antd'
import WidgetView from 'app/widget'

import configs from 'app/configs'
import model from 'app/model'
import 'app/static/styles/light.less'
import 'app/static/styles/dark.less'

const {
  manifest: { appId },
} = configs

export const widgetConfig: WidgetConfig = {
  size: 'small',
  type: 'solid',
}

const Widget = () => {
  return (
    <UIProvider appId={appId}>
      <WalletProvider>
        <AccountProvider>
          <MintProvider>
            <PoolProvider>
              <Provider store={model}>
                <ConfigProvider prefixCls={appId}>
                  <WidgetView />
                </ConfigProvider>
              </Provider>
            </PoolProvider>
          </MintProvider>
        </AccountProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export default Widget