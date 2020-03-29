import React, { useEffect, lazy, Suspense } from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import Header from './components/header/header';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';

// Redux
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// Pages
const HomePage = lazy(()=> import('./pages/homepage/homepage'));
const ShopPage = lazy(()=> import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'));
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout'));


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
      <GlobalStyle />
      <Header/>
      <Switch>

        <Suspense fallback={<Spinner />}>
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
        </Suspense>
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