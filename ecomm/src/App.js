import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';

// Redux
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// Pages
import CheckoutPage from './pages/checkout/checkout';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import ShopPage from './pages/shop/shop';
import { HomePage } from './pages/homepage/homepage';

// App component
class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props; 

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      
      if(userAuth){
         const userRef = await createUserProfileDocument(userAuth);
            userRef.onSnapshot(snapShot =>{
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  // Homepage -> render HomePage
  // if /shop (Header) -> render ShopPage 
  // if /checkout (cart-dropdown) -> render CheckoutPage
  // if /signin -> render SignInAndSignUpPage
  render(){
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
            this.props.currentUser ? (
              <Redirect to='/' />
            ):(
              <SignInAndSignUpPage/>
            )
          }
          />
      </Switch>
    </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);