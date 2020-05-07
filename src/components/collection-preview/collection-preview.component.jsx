import React from 'react';
import { withRouter } from 'react-router-dom';

import { default as CollectionItem } from '../collection-item/collection-item.container';

import { CollectionPreviewContainer, TitleTextContainer, PreviewContainer } from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match }) => (
  <CollectionPreviewContainer>
    <TitleTextContainer
      onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
    >
      {title.toUpperCase()}
    </TitleTextContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
