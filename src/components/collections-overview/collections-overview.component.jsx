import React from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { CollectionOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
  <CollectionOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionOverviewContainer>
);

export default CollectionsOverview;
