import React from 'react';
import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

// CartDropdown will take cartItems as argument. It will show list of items if
// items exist or show Your cart is empty if not. CartItem component is made for this
// dropdown, it takes cartitem data as argument and returns customized view for dropdown.
// if CustomButton is clicked, we go to '/checkout' page and toggleCartHidden action if triggered
const CartDropdown = ({ cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length 
                ?
                (cartItems.map(cartItem =>(<CartItem key={cartItem.id} item={cartItem} />)))
                :
                (<span className='empty-message'>Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={()=> 
            {
                history.push('/checkout');
                dispatch(toggleCartHidden());
            }}>
            GO TO CHECKOUT</CustomButton>
    </div>
);

// selectCartItems selector returns cart.cartItems
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
  });
  
export default withRouter(connect(mapStateToProps)(CartDropdown));