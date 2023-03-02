import { useRef, useState } from 'react'
import { Button, Card, Modal, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone'

import { userDataSelector } from '../store/selectors'
import { updateUser } from '../store/reducers/userReducer'
import { baseURL } from '../api/axios'
import AddressEdit from './AddressEdit'
import AddressInfo from './AddressInfo'

export default function ProfileSettingsModal({ open, handleClose }) {
  const { user } = useSelector(userDataSelector)
  const [userState, setUserState] = useState(user)
  const [isAddressEditOpen, setIsAddressEditOpen] = useState(false)

  const imgInput = useRef()

  const {
    firstName,
    lastName,
    patronymic,
    id,
    avatar,
    addresses = [],
  } = userState

  let defaultAvatar =
    'https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-default-male-avatar-png-image_2811083.jpg'

  if (avatar) {
    defaultAvatar = `${baseURL}/uploads/${avatar}`
  }
  const [picture, setPicture] = useState(defaultAvatar)

  const dispatch = useDispatch()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserState({ ...userState, [name]: value })
  }

  const handleClick = () => {
    imgInput.current.click()
  }

  const handleUpload = e => {
    const { files } = e.target
    const file = files[0]
    setPicture(URL.createObjectURL(file))
    setUserState({ ...userState, avatar: file })
  }

  const handleOkButton = () => {
    const dataToSend = { ...userState }
    const formData = new FormData()
    formData.append('image', dataToSend.avatar)
    delete dataToSend.avatar
    delete dataToSend.password
    delete dataToSend.roles
    for (let [key, value] of Object.entries(dataToSend)) {
      if (key === 'addresses' && value) {
        value = value.map(val => {
          delete val.id
          return val
        })
        formData.append(key, JSON.stringify(value))
        continue
      }
      formData.append(key, value)
    }
    dispatch(updateUser({ id, data: formData }))
    handleClose()
  }

  const addAddress = address => {
    setUserState({ ...userState, addresses: [...addresses, address] })
  }

  const deleteAddressHandle = addressId => {
    const newAddresses = addresses.filter(item => item.id !== addressId)
    setUserState({ ...userState, addresses: newAddresses })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledCard>
        <Typography variant="h4" component="h4">
          Profile Settings
        </Typography>
        <StyledFlexContainer>
          <StyledImageContainer
            onClick={handleClick}
            aria-hidden="true"
            style={{
              background: `url(${picture}) center center/cover no-repeat`,
            }}
          >
            <HiddenContainer>
              <AddAPhotoTwoToneIcon fontSize="small" />
              <Typography variant="h6">Upload Photo</Typography>
            </HiddenContainer>
          </StyledImageContainer>
          <HiddenInput
            type="file"
            accept="image/x-png,image/jpeg,image/gif"
            ref={imgInput}
            onChange={handleUpload}
          />

          <StyledInputContainer>
            <StyledInput
              name="firstName"
              key="firstName"
              label={'first name'}
              fullWidth
              value={firstName || ''}
              onChange={handleChangeInput}
            />

            <StyledInput
              name="lastName"
              key="lastName"
              label={'last name'}
              fullWidth
              value={lastName || ''}
              onChange={handleChangeInput}
            />

            <StyledInput
              name="patronymic"
              key="patronymic"
              label={'patronymic'}
              fullWidth
              value={patronymic || ''}
              onChange={handleChangeInput}
            />
          </StyledInputContainer>
        </StyledFlexContainer>
        {isAddressEditOpen ? (
          <AddressEdit
            cancelHandle={() => setIsAddressEditOpen(false)}
            addAddress={addAddress}
          />
        ) : (
          <>
            {!!addresses?.length && <p>Addresses:</p>}
            {addresses?.map(item => (
              <AddressInfo
                key={item.id}
                address={item}
                deleteAddressHandle={deleteAddressHandle}
              />
            ))}
            <Button onClick={() => setIsAddressEditOpen(true)}>
              Add Address
            </Button>
          </>
        )}
        <StyledContainerLeft>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            Cansel
          </Button>
          <ButtonWithLeftMargin
            color="secondary"
            variant="contained"
            onClick={handleOkButton}
            autoFocus
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
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px',
}))

const StyledFlexContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
}))

const StyledInputContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
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

const HiddenInput = styled('input')(() => ({
  display: 'none',
  width: '0',
}))

const StyledImageContainer = styled('div')(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.38);',
  height: '200px',
  borderRadius: '100%',
  marginBottom: '16px',
  width: '200px',
  boxShadow: '0px 7px 42px rgba(56, 0, 138, 0.04)',
}))

const HiddenContainer = styled('div')(() => ({
  opacity: 0,
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  '&:hover': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(190, 200, 210, 0.5)',
    cursor: 'pointer',
    opacity: 1,
  },
}))
