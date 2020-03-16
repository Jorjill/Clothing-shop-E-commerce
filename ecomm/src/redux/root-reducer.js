import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import shopReducer from './shop/shop.reducer';

// configuration of persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

// root reducer
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

// applying persist to root reducer
export default persistReducer(persistConfig, rootReducer);