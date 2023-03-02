import { Button, Card, Modal, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { isEmail } from '../utils'
import { registration, login } from '../store/reducers/userReducer'

export const AuthModal = ({ open, handleClose, isLogin }) => {
  const [formData, setFormData] = useState({ email: null, password: null })
  const [isValid, setIsValid] = useState(false)
  const { email, password } = formData
  const dispatch = useDispatch()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOkButton = () => {
    if (isLogin) {
      dispatch(login({ ...formData }))
    } else {
      dispatch(registration({ ...formData }))
    }
    handleClose()
  }

  const isValidForm = () => {
    setIsValid(isEmail(email) && password)
  }

  useEffect(() => isValidForm(), [email, password])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledCard>
        <Typography variant="h4" component="h4">
          {isLogin ? 'Login' : 'Registration'}
        </Typography>
        <StyledInput
          required
          name="email"
          key="email"
          label={'email'}
          error={!email && email !== null}
          fullWidth
          value={email || ''}
          onChange={handleChangeInput}
        />
        <StyledInput
          required
          name="password"
          key="password"
          label={'password'}
          error={!password && password !== null}
          fullWidth
          value={password || ''}
          onChange={handleChangeInput}
        />

        <StyledContainerLeft>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            Cansel
          </Button>
          <ButtonWithLeftMargin
            color="secondary"
            variant="contained"
            onClick={handleOkButton}
            autoFocus
            disabled={!isValid}
          >
            Ok
          </ButtonWithLeftMargin>
        </StyledContainerLeft>
      </StyledCard>
    </Modal>
  )
}

const StyledCard = styled(Card)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px',
}))

const StyledContainerLeft = styled('div')(() => ({
  display: 'flex',
  margin: '10px 0 0 0',
  justifyContent: 'flex-end',
}))

const StyledInput = styled(TextField)(() => ({
  margin: '10px 0',
}))

const ButtonWithLeftMargin = styled(Button)(() => ({
  marginLeft: '10px',
}))
