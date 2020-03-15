import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item';

import './checkout.scss';

// mapStateToProps function passes cartItems and 
// total as argument to CheckoutPage component  which is called when CustomButton is push on cart-dropdown
// component. values of cartItems and total are selectCartItems and selectCartTotal
// from cart.selectors. selectCartItems returns cart.cartItems from store and selectCartTotal
// returns accumulated value of items price.
const CheckoutPage = ({ cartItems, total }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
    <div className='total'>TOTAL: ${total}</div>
  </div>
);

// mapStateToProps returns cartItems and total as argument to CheckoutPage component
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);