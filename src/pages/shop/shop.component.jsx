import React from 'react';
import SHOP_DATA from './shop.data'
import { useState } from 'react';
import CollectionPrview from '../../components/preview-collection/collection-preview.component';

const ShopPage = () => {
    const [collections] = useState(SHOP_DATA);
    return (
        <div className="shop-page">
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPrview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}
export default ShopPage;