import { RowNode, StartEditingCellParams, GridApi } from 'ag-grid-community';
import { observable } from 'mobx';
import { IAuiGridColBaseProps, ISearchHeaderGrid } from 'src/states/EggStore';

const pubStore = observable({
  auGridDataset: [] as IAuiGridColBaseProps[],
  headerGridDataset: [] as ISearchHeaderGrid[],
  headerButtonGridDataset: [] as ISearchHeaderGrid[],
  gridButtonGridDataset: [] as ISearchHeaderGrid[],
  num: 0,
  increase() {
    this.num = 0;
  },
  syncDataset(datasetName: string, gridApi: GridApi) {
    // console.log(this[datasetName]);
    if (this[datasetName] && gridApi) {
      this[datasetName].length = 0;
      gridApi.forEachNode((node, index) => {
        this[datasetName].push(node.data);
      });
    }
  },
});
export default pubStore;
