import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import { withSpinner } from '../../components/with-spinner/with-spinner';
import CollectionsOverview from './collections-overview';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    withSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer