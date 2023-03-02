import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function AddressInfo({ address, deleteAddressHandle }) {
  const  id  = address.id
  const shortAddress = []
  for (const [key, value] of Object.entries(address)) {
    if (value && key!=='id') shortAddress.push(value)
  }
  return (
    <StyledFlexContainer>
      <StyledButtonContainer>
        <Button color="error">
          <DeleteIcon onClick={() => deleteAddressHandle(id)} />
        </Button>
        <Button color="success">
          <EditIcon />
        </Button>
      </StyledButtonContainer>
      {shortAddress.join(', ')}
      <br />
    </StyledFlexContainer>
  )
}

const StyledFlexContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
}))

const StyledButtonContainer = styled('div')(() => ({
  margin: '10px',
}))
