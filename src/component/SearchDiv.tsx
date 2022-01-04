import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { HeaderGridDataset, HiState, ISearchHeaderGrid } from 'src/states/EggStore';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ColumnApi, GridApi } from 'ag-grid-community';

const rowData2 = [{}] as ISearchHeaderGrid[];

console.log('rowData2:::', rowData2);
export const SearchDiv = () => {
  const [headerGridDataset, setHeaderGridDataset] = useRecoilState(HeaderGridDataset);
  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const [rowData, setRowData] = useState(null);
  const rowDD = rowData;

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const addSearchGridRow = () => {
    const newRow: ISearchHeaderGrid[] = [{}];
    console.log('rowData2:::', rowData2);
    // rowData2.push(newRow);

    gridApi.applyTransaction({ add: newRow });
  };

  return (
    <>
      <div>
        <Button
          color="secondary"
          style={{ backgroundColor: 'darkgrey', color: 'white' }}
          onClick={() => {
            addSearchGridRow();
          }}
        >
          Add Row
        </Button>
        <Button color="secondary" style={{ backgroundColor: 'darkgrey', color: 'white', marginLeft: '1rem' }}>
          Save
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '45rem', width: '50%' }}>
        <AgGridReact
          rowData={rowData2}
          onGridReady={onGridReady}
          reactUi={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            editable: true,
          }}
        >
          <AgGridColumn headerName="Label" field="label"></AgGridColumn>
          <AgGridColumn headerName="Name" field="name"></AgGridColumn>
          <AgGridColumn headerName="type" field="type"></AgGridColumn>
          <AgGridColumn headerName="class" field="compClass"></AgGridColumn>
          <AgGridColumn headerName="Id" field="compId"></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};
