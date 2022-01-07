import { atom } from 'recoil';

export interface ISearchHeaderGrid {
  sortSeq?: number;
  label?: string;
  name?: string;
  type?: string;
  compClass?: string;
  compId?: string;
}

export interface IAuiGridColBaseProps {
  dataField?: string;
  headerText?: string;
  style?: string;
  width?: string;
  dataType?: string;
  headerStyle?: string;
  formatString?: string;
  groupDataField?: string;
  sumFlag?: string;
}

// export interface IAuiGridColProps extends IAuiGridColBaseProps {
//   groupColmn
// }
export const AuGridDataset = atom({
  key: 'AuGridDataset',
  default: [] as IAuiGridColBaseProps[],
});

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
