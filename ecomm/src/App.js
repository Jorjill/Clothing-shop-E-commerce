import React, { useEffect } from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// Redux
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// Pages
import CheckoutPage from './pages/checkout/checkout';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import ShopPage from './pages/shop/shop';
import { HomePage } from './pages/homepage/homepage';

// App component
const App = ({ checkUserSession,currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);
  
  // if homepage -> render HomePage
  // if /shop (Header) -> render ShopPage 
  // if /checkout (cart-dropdown) -> render CheckoutPage
  // if /signin -> render SignInAndSignUpPage or homepage if currentUser is true
    return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route 
          exact 
          path='/signin' 
          render={()=>
            currentUser ? (<Redirect to='/' />):(<SignInAndSignUpPage/>)
          }
          />
      </Switch>
    </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);