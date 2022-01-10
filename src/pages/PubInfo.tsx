import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { ButtonDiv } from 'src/component/ButtonDiv';
import { GridButtonDiv } from 'src/component/GridButtonDiv';
import { GridItemDiv } from 'src/component/GridItemDiv';
import { MobxButton } from 'src/component/MobxButton';
import { MobxGridButtonDiv } from 'src/component/MobxGridButtonDiv';
import { MobxGridItemDiv } from 'src/component/MobxGridItemDiv';
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
      <MobxButton></MobxButton>
      <MobxSearchDiv></MobxSearchDiv>
      <MobxSearchButtonDiv></MobxSearchButtonDiv>
      <MobxGridButtonDiv></MobxGridButtonDiv>
      <MobxGridItemDiv></MobxGridItemDiv>
    </div>
  );
};
export default PubInfo;
