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


  componentDidMount(){ // when App component mounted this function will work

    // App component gets a setCurrentUser prop by using mapDispatchToProps function which is connected to App component by using connect() function. 
    // setCurrentUser is action function which is inside /redux/user/user.actions file and imported inside this component. This function takes id: email: name: data from
    // snapShot as argument and returns an object {type: payload: } where type is used by reducer to define what data it must pass to store, payload is argument of this setCurrentUser() function
    // which is snapShot.id, ...snapShot.data(). Then mapDispatchToProps connects this action to reducer which returns object {...state, currentUser: action.payload} where action.payload means that
    // currentUser: snapShot.id, ...snapShot.data() it gets passed to root reducer where combineReducers() function gets currentUser: snapShot.id, ...snapShot.data() as a value of key user so it becomes 
    // user: {currentUser: snapShot.id, ...snapShot.data()} which passed to store.
    const {setCurrentUser} = this.props; 

    // auth.onAuthStateChanged function works when something changes in auth object which means login or logoff is called. if user is logged which means userAuth is true. If true
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        // it invokes createUserProfileDocument() function which checks if this user is in firestore database if not, it creates a new user in database and returns user's data to userRef variable.
        const userRef = await createUserProfileDocument(userAuth);
        // gets user's data and uses it as argument of setCurrentUser() function which returns {type: UserActionTypes.SET_CURRENT_USER, payload: } where payload's value is the arguments we passed
        // this object will be passed to userReducer() as argument because we wrote mapDispatchToProps() and connect()
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
            // if currentUser is not null redirect to homepage. currentUser passed to App component as a prop because we wrote mapStateToProps() which returns user.currentUser as a currentUser prop by using connect().
            // which gives us access to store.
            this.props.currentUser ? (
              <Redirect to='/' />
            ):(
              // else stay at SignInAndSignUpPage page
              <SignInAndSignUpPage/>
            )
          }
          />
      </Switch>
    </div>
    );
  }
}

// currentUser will be a prop to App component because we used connect(). currentUser's value is selectCurrentUser which is inside user.selectors file where selectCurrentUser equal to values returned by createSelector()
// function which takes [selectUser], (user) => user.currentUser as argument where selectUser = state => state.user . Remember that store stores user: {currentUser: snapShot.id, ...snapShot.data()}.
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// mapDispatchToProps passed values returned by setCurrentUser to userReducer() as argument.
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);