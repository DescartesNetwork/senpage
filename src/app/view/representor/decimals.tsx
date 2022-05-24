import { useDispatch, useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Col, Row, Switch, Typography } from 'antd'

import { AppDispatch, AppState } from 'app/model'
import {
  setData,
  setDecimalized,
  TransferData,
} from 'app/model/main.controller'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { toBigInt } from 'app/lib/utils'

const Decimals = () => {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: AppState) => state.main.data)
  const decimalized = useSelector((state: AppState) => state.main.decimalized)
  const mintAddress = useSelector((state: AppState) => state.main.mintAddress)
  const decimals = useMintDecimals(mintAddress) || 0

  const onSwitch = async (checked: boolean) => {
    const nextData: TransferData = data.map(([address, amount]) => {
      const newAmount = checked
        ? utils.decimalize(amount, decimals).toString()
        : utils.undecimalize(toBigInt(amount), decimals)
      return [address, newAmount]
    })
    await dispatch(setDecimalized(checked))
    await dispatch(setData(nextData))
  }

  return (
    <Row gutter={[8, 8]} justify="end" align="middle">
      <Col>
        <Typography.Text>With Decimals?</Typography.Text>
      </Col>
      <Col>
        <Switch
          checked={decimalized}
          onChange={onSwitch}
          checkedChildren={decimals}
          unCheckedChildren={decimals}
          disabled={!decimals}
        />
      </Col>
    </Row>
  )
}

export default Decimals
