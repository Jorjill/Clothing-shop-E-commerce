import React from 'react';
import './collections-overview.scss';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';

// CollectionOverview is what we see when we click on Shop link in the header
const CollectionOverview = ({ collections }) => (
    <div className='collection-overview'>
        {collections.map(({ id,...otherCollectionProps }) =>(
            <CollectionPreview key={id} {...otherCollectionProps}/>
        ))}
    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
  });

export default connect(mapStateToProps)(CollectionOverview);