
import React from 'react';

import Directory from './directory.component';

import { SECTION_DATA } from './directory.data';

const DirectoryContainer = () => {
    const { sections } = SECTION_DATA;

    return <Directory sections={sections} />
}

export default DirectoryContainer;