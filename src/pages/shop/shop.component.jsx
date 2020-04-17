import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './shop.style.scss'
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container';


const ShopPage = ({ match, fetchCollectionsStartAsync, isCollectionsLoaded }) => {
    const [count] = useState(0);
    useEffect(() => {
        fetchCollectionsStartAsync();
    }, [count]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}
                component={CollectionsOverviewContainer} />

            <Route path={`${match.path}/:collectionId`}
                component={CollectionPageContainer} />
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);