import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/Login/Login'
import Contacts from './Pages/Contacts/Contacts'

function App() {

  return (
    <>
      <div className='container'>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/signup' component={SignUp} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/contacts' component={Contacts} exact />
        </Switch>
      </div>
    </>
  )
}
export default App