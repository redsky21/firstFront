import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { ButtonDiv } from 'src/component/ButtonDiv';
import { SearchDiv } from 'src/component/SearchDiv';
import { HiState } from 'src/states/EggStore';

const PubInfo = () => {
  return (
    <div>
      <SearchDiv />
    </div>
  );
};
export default PubInfo;
