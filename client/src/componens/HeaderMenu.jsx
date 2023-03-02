import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../api/axios'
import { logout } from '../store/reducers/userReducer'
import { userDataSelector } from '../store/selectors'
import { AuthModal } from './AuthModal'
import ProfileSettingsModal from './ProfileSettingsModal'

export default function HeaderMenu() {
  const userSelector = useSelector(userDataSelector)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openProfileSettingsModal, setOpenProfileSettingsModal] =
    useState(false)

  const dispatch = useDispatch()

  const settings = !!userSelector.token
    ? [
        {
          name: 'Profile Settings',
          handle: () => {
            setOpenProfileSettingsModal(true)
          },
        },
        {
          name: 'Logout',
          handle: () => {
            localStorage.removeItem('token')
            dispatch(logout())
          },
        },
      ]
    : [
        {
          name: 'Login',
          handle: () => {
            setOpenLoginModal(true)
          },
        },
        {
          name: 'Registration',
          handle: () => {
            setOpenRegistrationModal(true)
          },
        },
      ]

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  let avatarSrc = '/static/images/avatar/2.jpg'
  if (userSelector?.user?.avatar) {
    avatarSrc = `${baseURL}/uploads/${userSelector.user.avatar}`
  }
  return (
    <>
      {openRegistrationModal && (
        <AuthModal
          open={openRegistrationModal}
          handleClose={() => setOpenRegistrationModal(false)}
          isLogin={false}
        />
      )}

      {openLoginModal && (
        <AuthModal
          open={openLoginModal}
          handleClose={() => setOpenLoginModal(false)}
          isLogin={true}
        />
      )}

      {openProfileSettingsModal && (
        <ProfileSettingsModal
          open={openProfileSettingsModal}
          handleClose={() => setOpenProfileSettingsModal(false)}
        />
      )}

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              src={avatarSrc}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(({ name, handle }) => (
            <MenuItem key={name} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={handle}>
                {name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  )
}
