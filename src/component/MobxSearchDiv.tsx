import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { ISearchHeaderGrid } from 'src/states/EggStore';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { CellValueChangedEvent, ColumnApi, GridApi, RowDragEvent } from 'ag-grid-community';
import store from 'src/store';
import { v4 as uuidv4 } from 'uuid';
import { runInAction } from 'mobx';

import { observer } from 'mobx-react-lite';

//console.log('rowData2:::', rowData2);
export const MobxSearchDiv = observer(() => {
  const { pubStore } = store;
  // const { pubStore } = useStores();

  const headerGridDataset = [...pubStore.headerGridDataset];
  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const defaultClass = [
    { defType: 'DatePicker', clName: 'dateWrap' },
    { defType: 'Select', clName: 'sel mr7' },
    { defType: 'Radio', clName: 'checkGroup' },
    { defType: 'Input', clName: 'inp w120 mr10' },
    { defType: 'Checkbox', clName: 'checkGroup' },
    { defType: 'Button', clName: 'comBtn' },
  ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  // useEffect(() => {
  //   if (gridApi) gridApi.refreshCells();
  // }, [headerGridDataset]);

  const addSearchGridRow = () => {
    runInAction(() => {
      const newRow: ISearchHeaderGrid = { rowId: uuidv4() };
      pubStore.headerGridDataset.push(newRow);
    });
    console.log('headerGridDataset', pubStore.headerGridDataset);
  };
  // console.log('headerGridDataset', pubStore.headerGridDataset);

  const onCellValueChanged = ({ node: rowNode, data, colDef }: CellValueChangedEvent) => {
    console.log('colDef', colDef);
    console.log('data', data);
    if (data.type && colDef && colDef.field === 'type') {
      const defValue = defaultClass.find((defRow) => {
        return defRow.defType === data.type;
      });
      const gridRow = pubStore.headerGridDataset.find((row) => {
        return row.rowId === data.rowId;
      });
      gridRow.compClass = defValue.clName;
      gridApi.refreshCells();
      console.log('headerGridDataset', headerGridDataset);
    }
  };

  const onRowDragMove = (event: RowDragEvent) => {
    runInAction(() => {
      pubStore.headerGridDataset.length = 0;
      // gridApi.forEachNode((node, index) => {
      //   pubStore.headerButtonGridDataset.push(node.data);
      // });
      pubStore.syncDataset('headerGridDataset', gridApi);
    });
  };

  return (
    <>
      <div style={{ display: 'flex', width: '50%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h4 style={{ margin: '1rem 0 0.5rem 1rem' }}>조회영역 항목</h4>
        <Button
          variant="contained"
          style={{
            margin: '1rem 0 0.5rem 1rem',
          }}
          onClick={() => {
            addSearchGridRow();
          }}
        >
          조건 추가
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '20rem', width: '50%', margin: '0 0 0.5rem 1rem' }}>
        <AgGridReact
          rowData={headerGridDataset}
          onGridReady={onGridReady}
          reactUi={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            editable: true,
          }}
          //   getRowNodeId={getRowNodeId}
          onCellValueChanged={onCellValueChanged}
          rowDragManaged={true}
          suppressMoveWhenRowDragging={true}
          animateRows={true}
          //onRowDragMove={onRowDragMove}
          onRowDragEnd={onRowDragMove}
          stopEditingWhenCellsLoseFocus={true}
        >
          <AgGridColumn
            headerName=""
            rowDrag={true}
            maxWidth={50}
            editable={false}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn headerName="Label" field="label" resizable={true}></AgGridColumn>
          <AgGridColumn headerName="Name" field="name" resizable={true}></AgGridColumn>
          <AgGridColumn
            headerName="type"
            field="type"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ['', 'DatePicker', 'Select', 'Radio', 'TextField', 'Checkbox', 'Button'],
            }}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn headerName="class" field="compClass" resizable={true}></AgGridColumn>
          <AgGridColumn headerName="Id" field="compId" resizable={true}></AgGridColumn>
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
                      pubStore.syncDataset('headerGridDataset', gridApi);
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
