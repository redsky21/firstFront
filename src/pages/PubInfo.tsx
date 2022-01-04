import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { HiState } from 'src/states/EggStore';

const PubInfo = () => {
  const [hiState, setHiState] = useRecoilState(HiState);
  return <div>{hiState}</div>;
};
export default PubInfo;
