import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { ButtonDiv } from 'src/component/ButtonDiv';
import { GridButtonDiv } from 'src/component/GridButtonDiv';
import { GridItemDiv } from 'src/component/GridItemDiv';
import { MobxGridButtonDiv } from 'src/component/MobxGridButtonDiv';
import { MobxSearchButtonDiv } from 'src/component/MobxSearchButtonDiv';
import { MobxSearchDiv } from 'src/component/MobxSearchDiv';

import { SearchButtonDiv } from 'src/component/SearchButtonDiv';
import { SearchDiv } from 'src/component/SearchDiv';
import { HiState } from 'src/states/EggStore';

const PubInfo = () => {
  return (
    <div>
      {/* <ButtonDiv />
      <SearchDiv></SearchDiv>
      <SearchButtonDiv />
      <GridButtonDiv />
      <GridItemDiv /> */}
      <MobxSearchDiv></MobxSearchDiv>
      <MobxSearchButtonDiv></MobxSearchButtonDiv>
      <MobxGridButtonDiv></MobxGridButtonDiv>
    </div>
  );
};
export default PubInfo;
