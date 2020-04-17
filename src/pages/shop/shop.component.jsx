import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './shop.style.scss'
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, isCollectionFetching, fetchCollectionsStartAsync }) => {
    const [count] = useState(0);
    useEffect(() => {
        fetchCollectionsStartAsync();
    }, [count]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}
                render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />

            <Route path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);