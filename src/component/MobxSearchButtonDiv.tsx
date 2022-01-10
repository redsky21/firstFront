import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { CellValueChangedEvent, ColumnApi, GridApi, RowDragEvent } from 'ag-grid-community';
import { observer } from 'mobx-react-lite';
import { ISearchHeaderGrid } from 'src/states/EggStore';
import store from 'src/store';
import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
export const MobxSearchButtonDiv = observer(() => {
  const { pubStore } = store;

  const headerButtonGridDataset = [...pubStore.headerButtonGridDataset];

  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);

  const defaultClass = [
    { defType: 'Contained', clName: 'inquBtn' },
    { defType: 'Outlined', clName: 'comBtn' },
  ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    // rowData2.slice(0, rowData2.length);
    pubStore.headerButtonGridDataset.length = 0;
  }, []);

  const addSearchGridRow = () => {
    runInAction(() => {
      const newRow: ISearchHeaderGrid = { rowId: uuidv4(), type: 'Contained', compClass: 'inquBtn' };
      pubStore.headerButtonGridDataset.push(newRow);
    });
  };

  const onCellValueChanged = ({ node: rowNode, data, colDef }: CellValueChangedEvent) => {
    console.log('colDef', colDef);
    if (data.type && colDef && colDef.field === 'type') {
      const defValue = defaultClass.find((defRow) => {
        return defRow.defType === data.type;
      });
      const gridRow = pubStore.headerButtonGridDataset.find((row) => {
        return row.rowId === data.rowId;
      });
      if (defValue && defValue.clName) gridRow.compClass = defValue.clName;
      gridApi.refreshCells();
      console.log('headerButtonGridDataset', headerButtonGridDataset);
    }
  };

  const onRowDragMove = (event: RowDragEvent) => {
    runInAction(() => {
      pubStore.headerButtonGridDataset.length = 0;
      // gridApi.forEachNode((node, index) => {
      //   pubStore.headerButtonGridDataset.push(node.data);
      // });
      pubStore.syncDataset('headerButtonGridDataset', gridApi);
    });
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
        <h4 style={{ margin: '1rem 0 0.5rem 1rem' }}>조회영역 버튼</h4>
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
          rowData={headerButtonGridDataset}
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
            headerName="Variant"
            field="type"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ['', 'Contained', 'Outlined'],
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
                      pubStore.syncDataset('headerButtonGridDataset', gridApi);
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
