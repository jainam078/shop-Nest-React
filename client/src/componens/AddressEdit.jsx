import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { styled } from '@mui/material/styles'
import * as uuid from 'uuid'

export default function AddressEdit({ address, cancelHandle, addAddress }) {
  
  const initAddress = {
    country: 'Ukraine',
    street: '',
    houseNumber: '',
    roomNumber: null,
    postalCode: null,
    phoneCode:null,
    id: uuid.v4(),
  }
  
  const [addressState, setAddressState] = useState(
    address || initAddress
  )

  const handleChangeInput = e => {
    const { name, value } = e.target
    setAddressState({...addressState, [name]: value })
  }


  const saveHandle = ()=>{
    addAddress(addressState)
    cancelHandle()
  }
  const { country, street, houseNumber, roomNumber, postalCode, id, phoneCode } = addressState
  return (
    <StyledContainer>
      <StyledInput
        name="country"
        key="country"
        label={'country'}
        value={country || ''}
        onChange={handleChangeInput}
      />
      <StyledInput
        name="street"
        key="street"
        label={'street'}
        value={street || ''}
        onChange={handleChangeInput}
      />
      <StyledInput
        name="houseNumber"
        key="houseNumber"
        label={'house number'}
        value={houseNumber || ''}
        onChange={handleChangeInput}
      />

      <StyledInput
        name="roomNumber"
        key="roomNumber"
        label={'room number'}
        type='number'
        value={roomNumber }
        onChange={handleChangeInput}
      />

      <StyledInput
        name="postalCode"
        key="postalCode"
        label={'postal code'}
        type='number'
        value={postalCode }
        onChange={handleChangeInput}
      />

<StyledInput
        name="phoneCode"
        key="phoneCode"
        label={'phone code'}
        type='string'
        value={phoneCode }
        onChange={handleChangeInput}
      />
      <StyledButtonContainer>
        <Button color="success" onClick={saveHandle}>
          <CheckCircleIcon fontSize="large" />
        </Button>

        <Button color="error" onClick={cancelHandle}>
          <CancelIcon fontSize="large" />
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  )
}

const StyledInput = styled(TextField)(() => ({
  margin: '10px 0',
  width: '40%',
}))

const StyledButtonContainer = styled('div')(() => ({
  margin: '10px 0',
  width: '40%',
  display: 'flex',
  justifyContent: 'center',
}))

const StyledContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
}))
