import { RowNode, StartEditingCellParams, GridApi, ColDef } from 'ag-grid-community';
import { observable } from 'mobx';
import { IAuiGridColBaseProps, ISearchHeaderGrid } from 'src/states/EggStore';

const pubStore = observable({
  auGridDataset: [] as IAuiGridColBaseProps[],
  headerGridDataset: [] as ISearchHeaderGrid[],
  headerButtonGridDataset: [] as ISearchHeaderGrid[],
  gridButtonGridDataset: [] as ISearchHeaderGrid[],
  testDataRow: {},
  num: 0,
  increase() {
    this.num = 0;
  },
  get auGridString(): string {
    const returnVal = JSON.stringify(this.auGridDataset);
    console.log('returnVal', returnVal);
    return returnVal;
  },
  get agGridCol(): ColDef[] {
    const agGridColDef: ColDef[] = [];
    this.testDatRow = {};
    this.auGridDataset.forEach((element: IAuiGridColBaseProps) => {
      console.log('element', element);
      const newCol: ColDef = {};
      newCol.field = element.dataField;
      newCol.headerName = element.headerText;
      agGridColDef.push(newCol);
      // this.testDatRow = {...this.testDatRow,{element.dataField:''}}
      this.testDataRow[element.dataField] = null;
    });
    return agGridColDef;
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
