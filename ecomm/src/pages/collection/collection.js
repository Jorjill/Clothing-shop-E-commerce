import React from 'react';
import './collection.scss';
import CollectionItem from '../../components/collection-item/collection-item';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

// collection prop has title and items. CollectionPage component renders title and iterates
// over items depending on which id number of corresponding url has.
const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className='collection-page'>
            <h2 className='title'>
                { title }
            </h2>
            <div className = 'items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
            </div>
        </div>
    );
};

// Select items by corresponding collectionId and pass as prop
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);