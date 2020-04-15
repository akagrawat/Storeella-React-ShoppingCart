import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collection-overview.style.scss';
import CollectionPrview from '../collection-preview/collection-preview.component';
import { selectCollectionPreview } from '../../redux/shop/shop.selectors';

const CollectionOverview = ({ collections }) => {
    return (
        <div className="collection-overview">
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPrview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionPreview
});

export default connect(mapStateToProps)(CollectionOverview);