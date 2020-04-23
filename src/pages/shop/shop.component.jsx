import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.style.scss'
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.action';

import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container';


const ShopPage = ({ match, fetchCollectionsStart }) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, []);

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
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);