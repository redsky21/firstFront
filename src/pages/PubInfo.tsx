import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { ButtonDiv } from 'src/component/ButtonDiv';
import { GridButtonDiv } from 'src/component/GridButtonDiv';
import { GridItemDiv } from 'src/component/GridItemDiv';

import { SearchButtonDiv } from 'src/component/SearchButtonDiv';
import { SearchDiv } from 'src/component/SearchDiv';
import { HiState } from 'src/states/EggStore';

const PubInfo = () => {
  return (
    <div>
      <ButtonDiv />
      <SearchDiv />
      <SearchButtonDiv />
      <GridButtonDiv />
      <GridItemDiv />
    </div>
  );
};
export default PubInfo;
