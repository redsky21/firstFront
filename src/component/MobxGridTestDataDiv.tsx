import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { CellValueChangedEvent, ColumnApi, GridApi, RowDragEvent } from 'ag-grid-community';
import { observer } from 'mobx-react-lite';
import store from 'src/store';
import { ISearchHeaderGrid } from 'src/states/EggStore';
import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { Sync } from '@mui/icons-material';
import { NumericEditor } from '../utils/grid-util';
// const rowData2 = [{ type: 'Contained', compClass: 'inquBtn' }] as ISearchHeaderGrid[];

//console.log('rowData2:::', rowData2);
export const MobxGridTestDataDiv = observer(() => {
  const { pubStore } = store;

  const gridTestDataset = [...pubStore.gridTestDataset];

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
      const newRow: ISearchHeaderGrid = { rowId: uuidv4() };
      //console.log('rowData2:::', rowData2);
      // rowData2.push(newRow);
      pubStore.gridTestDataset.push(newRow);
      console.log('pubStore.gridTestDataset:::::', pubStore.gridTestDataset);
    });
  };
  const getRowNodeId = (data) => {
    return data.id;
  };

  const onRowDragMove = (event: RowDragEvent) => {
    runInAction(() => {
      pubStore.gridTestDataset.length = 0;
      pubStore.syncDataset('gridTestDataset', gridApi);
    });
  };
  useEffect(() => {
    console.log('pubStore.gridTestDataset:::::', pubStore.gridTestDataset);
  }, [pubStore.gridTestDataset]);

  const onCellValueChanged = ({ node: rowNode, data, colDef }: CellValueChangedEvent) => {
    // console.log('colDef', colDef);
    console.log('data', data);
    // pubStore.syncDataset('gridTestDataset', gridApi);
    // if (data.type && colDef && colDef.field === 'type') {
    //   const defValue = defaultClass.find((defRow) => {
    //     return defRow.defType === data.type;
    //   });
    //   const gridRow = pubStore.gridTestDataset.find((row) => {
    //     return row.rowId === data.rowId;
    //   });
    //   if (defValue && defValue.clName) gridRow.compClass = defValue.clName;
    //   gridApi.refreshCells();
    //   console.log('gridTestDataset', gridTestDataset);
    // }
  };

  const columnList = useMemo(() => {
    console.log('columnList:::', pubStore.agGridCol);
    if (pubStore.agGridCol && pubStore.agGridCol.length > 0) {
      const temp = pubStore.agGridCol.map((element) => {
        return element;
      });

      return temp.map(({ field, headerName, ...rest }: any) => (
        <AgGridColumn key={headerName} field={field} headerName={headerName} {...rest} />
      ));
    }
  }, [pubStore.agGridCol]);

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
          rowData={gridTestDataset}
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
          frameworkComponents={{
            numericEditor: NumericEditor,
            // dataTypeCellRenderer: dataTypeCellRenderer,
          }}
        >
          {columnList}
        </AgGridReact>
      </div>
    </>
  );
});
