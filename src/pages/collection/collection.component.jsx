import React from 'react';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { CollectionContainer, TitleText, ItemsContainer } from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionContainer>
      <TitleText>{title}</TitleText>
      <ItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemsContainer>
    </CollectionContainer>
  );
};

export default CollectionPage;
