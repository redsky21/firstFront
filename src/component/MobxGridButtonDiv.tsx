import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { CellValueChangedEvent, ColumnApi, GridApi, RowDragEvent } from 'ag-grid-community';
import { observer } from 'mobx-react-lite';
import store from 'src/store';
import { ISearchHeaderGrid } from 'src/states/EggStore';
import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { retrieveWord } from 'src/api/bootService';
// const rowData2 = [{ type: 'Contained', compClass: 'inquBtn' }] as ISearchHeaderGrid[];

//console.log('rowData2:::', rowData2);
export const MobxGridButtonDiv = observer(() => {
  const { pubStore } = store;

  const gridButtonGridDataset = [...pubStore.gridButtonGridDataset];

  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);

  const defaultClass = [
    { defType: 'Contained', clName: 'inquBtn' },
    { defType: 'Outlined', clName: 'comBtn' },
  ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  };

  const addSearchGridRow = () => {
    runInAction(() => {
      const newRow: ISearchHeaderGrid = { rowId: uuidv4(), type: 'Contained', compClass: 'inquBtn' };
      //console.log('rowData2:::', rowData2);
      // rowData2.push(newRow);
      pubStore.gridButtonGridDataset.push(newRow);
    });
  };
  const getRowNodeId = (data) => {
    return data.id;
  };

  const onRowDragMove = (event: RowDragEvent) => {
    runInAction(() => {
      pubStore.gridButtonGridDataset.length = 0;
      pubStore.syncDataset('gridButtonGridDataset', gridApi);
    });
  };

  const onCellValueChanged = async ({ node: rowNode, data, colDef }: CellValueChangedEvent) => {
    console.log('colDef', colDef);
    console.log('data', data);
    if (data.type && colDef && colDef.field === 'type') {
      const defValue = defaultClass.find((defRow) => {
        return defRow.defType === data.type;
      });
      const gridRow = pubStore.gridButtonGridDataset.find((row) => {
        return row.rowId === data.rowId;
      });
      if (defValue && defValue.clName) gridRow.compClass = defValue.clName;
      gridApi.refreshCells();
      console.log('gridButtonGridDataset', gridButtonGridDataset);
    }
    if (colDef && colDef.field === 'label') {
      console.log(' data.label', data.label);
      const body = { label: data.label };
      const respData = await retrieveWord(body);
      if (respData) {
        const gridRow = pubStore.gridButtonGridDataset.find((row) => {
          return row.rowId === data.rowId;
        });
        // if (!data.name) {
        gridRow.name = respData + '';
        // }
        // if (!data.compId) {
        gridRow.compId = respData + '';
        // }
        gridApi.refreshCells();
      }
    }
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
          variant="contained"
          style={{
            // backgroundColor: '#1EA2A4',
            // color: 'white',
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
          rowData={gridButtonGridDataset}
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
          <AgGridColumn
            headerName="삭제"
            field="aa"
            resizable={true}
            cellRendererFramework={(params: any) => {
              return (
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      console.log('params', params);
                      console.log('params.node', params.node);
                      gridApi.applyTransaction({ remove: [params.data] });
                      console.log('gridApi', gridApi);
                      pubStore.syncDataset('gridButtonGridDataset', gridApi);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              );
            }}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
});
