import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './componens/Header'
import { getUserByEmail } from './store/reducers/userReducer'
import { userDataSelector } from './store/selectors'
import { getUserFromToken } from './utils'

function App() {
  const userSelector = useSelector(userDataSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userSelector.token) {
      localStorage.setItem('token', userSelector.token)
    }
  }, [userSelector.token])

  useEffect(() => {
    const tokenFromLocalStore = localStorage.getItem('token')
    if (tokenFromLocalStore) {
      const user = getUserFromToken(tokenFromLocalStore)
      dispatch(getUserByEmail(user.email))
    }
  }, [])

  return (
    <>
      <Header />
    </>
  )
}

export default App
