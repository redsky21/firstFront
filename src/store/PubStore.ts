import { observable } from 'mobx';
import { IAuiGridColBaseProps, ISearchHeaderGrid } from 'src/states/EggStore';

const pubStore = observable({
  auGridDataset: [] as IAuiGridColBaseProps[],
  headerGridDataset: [] as ISearchHeaderGrid[],
  headerButtonGridDataset: [] as ISearchHeaderGrid[],
  gridButtonGridDataset: [] as ISearchHeaderGrid[],
});
export default pubStore;
