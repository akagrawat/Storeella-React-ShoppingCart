import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.style.scss'
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.action';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
    const [loading, setLoading] = useState(true);
    let unsubscribeFromSnapshot = null;
    useEffect(() => {
        const collectionRef = firestore.collection('collections');

        unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            setLoading(false);
        });
        return () => unsubscribeFromSnapshot();
    }
    )
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}
                render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />

            <Route path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);