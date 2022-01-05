import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {
  GridButtonGridDataset,
  HeaderButtonGridDataset,
  HeaderGridDataset,
  HiState,
  ISearchHeaderGrid,
} from 'src/states/EggStore';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { CellValueChangedEvent, ColumnApi, GridApi, RowDragEvent } from 'ag-grid-community';

const rowData2 = [{ type: 'Contained', compClass: 'inquBtn' }] as ISearchHeaderGrid[];

//console.log('rowData2:::', rowData2);
export const GridButtonDiv = () => {
  const [gridButtonGridDataset, setGridButtonGridDataset] = useRecoilState(GridButtonGridDataset);
  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const [rowData, setRowData] = useState(null);
  const rowDD = rowData;
  const defaultClass = [
    { defType: 'Contained', clName: 'inquBtn' },
    { defType: 'Outlined', clName: 'comBtn' },
  ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    rowData2.slice(0, rowData2.length);
  }, []);

  const addSearchGridRow = () => {
    const newRow: ISearchHeaderGrid[] = [{ type: 'Contained', compClass: 'inquBtn' }];
    //console.log('rowData2:::', rowData2);
    // rowData2.push(newRow);

    gridApi.applyTransaction({ add: newRow });
  };
  const getRowNodeId = (data) => {
    return data.id;
  };

  const getRowData = () => {
    const rowData3 = [];
    gridApi.forEachNode((node) => {
      rowData3.push(node.data);
    });
    //console.log('Row Data:');
    //console.log(rowData3);
    setGridButtonGridDataset(rowData3);
  };
  const onRowDragMove = (event: RowDragEvent) => {
    const updateRows = [];
    gridApi.forEachNode((node, index) => {
      //console.log('node.data:::', node.data);
      node.data.sortSeq = index;
      updateRows.push(node.data);
    });
    gridApi.applyTransaction({ update: updateRows });
    refreshDataset();
  };

  const refreshDataset = () => {
    const updateRows = [];
    gridApi.forEachNode((node, index) => {
      //console.log('node.data:::', node.data);
      node.data.sortSeq = index;
      const atomLine = Object.assign({}, node.data);
      updateRows.push(atomLine);
    });
    setGridButtonGridDataset(updateRows);
  };

  const onCellValueChanged = ({ node: rowNode, data }: CellValueChangedEvent) => {
    //console.log('Data', data);
    if (data.type) {
      //   if (!data.compClass) {
      //console.log('TTy', data.type);
      const defValue = defaultClass.find((defRow) => {
        return defRow.defType === data.type;
      });
      //console.log('defValue', defValue.clName);
      rowNode.setData({ ...data, compClass: defValue.clName });
      //}
    }
    refreshDataset();
  };
  return (
    <>
      <div style={{ display: 'flex', width: '50%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* <Button
          color="secondary"
          style={{
            backgroundColor: '#A55500',
            color: 'rgb(255,255,255,0.9)',
            margin: '1rem 0 0.5rem 1rem',
          }}
          onClick={() => {
            getRowData();
          }}
        >
          파일 생성
        </Button> */}
        <h4 style={{ margin: '1rem 0 0.5rem 1rem' }}>Grid 버튼</h4>
        <Button
          variant="outlined"
          style={{
            backgroundColor: '#1EA2A4',
            color: 'white',
            margin: '1rem 0 0.5rem 1rem',
          }}
          onClick={() => {
            addSearchGridRow();
          }}
        >
          버튼 추가
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '15rem', width: '50%', margin: '0 0 0.5rem 1rem' }}>
        <AgGridReact
          rowData={rowData2}
          onGridReady={onGridReady}
          reactUi={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            editable: true,
          }}
          // getRowNodeId={getRowNodeId}
          onCellValueChanged={onCellValueChanged}
          rowDragManaged={true}
          suppressMoveWhenRowDragging={true}
          animateRows={true}
          onRowDragEnd={onRowDragMove}
          stopEditingWhenCellsLoseFocus={true}
        >
          <AgGridColumn headerName="" rowDrag={true} maxWidth={50} editable={false}></AgGridColumn>
          <AgGridColumn headerName="Label" field="label"></AgGridColumn>
          <AgGridColumn headerName="Name" field="name"></AgGridColumn>
          <AgGridColumn
            headerName="Variant"
            field="type"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ['', 'Contained', 'Outlined'],
            }}
          ></AgGridColumn>
          <AgGridColumn headerName="class" field="compClass"></AgGridColumn>
          <AgGridColumn headerName="Id" field="compId"></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};
