import { atom } from 'recoil';

export interface ISearchHeaderGrid {
  label?: string;
  name?: string;
  type?: string;
  compClass?: string;
  compId?: string;
}

export const HiState = atom({
  key: 'hiState',
  default: '아아가',
});

export const HeaderGridDataset = atom({
  key: 'HeaderGridDataset',
  default: [] as ISearchHeaderGrid[],
});

export const HeaderButtonGridDataset = atom({
  key: 'HeaderButtonGridDataset',
  default: [] as ISearchHeaderGrid[],
});

export const GridButtonGridDataset = atom({
  key: 'GridButtonGridDataset',
  default: [] as ISearchHeaderGrid[],
});
