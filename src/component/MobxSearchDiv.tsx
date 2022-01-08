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

import { runInAction } from 'mobx';

import useStores from 'src/store/useStores';
import pubStore from 'src/store/PubStore';
import { observer } from 'mobx-react';

const rowData2 = [{}] as ISearchHeaderGrid[];

//console.log('rowData2:::', rowData2);
export const MobxSearchDiv = observer(() => {
  const publishStore = pubStore;
  // const { publishStore } = useStores();

  const headerGridDataset = [...publishStore.headerGridDataset];
  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const [rowData, setRowData] = useState(null);
  const rowDD = rowData;
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

  useEffect(() => {
    if (gridApi) gridApi.refreshCells();
  }, [headerGridDataset]);

  const addSearchGridRow = () => {
    // //console.log('rowData2:::', rowData2);
    // // rowData2.push(newRow);

    // gridApi.applyTransaction({ add: newRow });
    runInAction(() => {
      const newRow: ISearchHeaderGrid = {};
      publishStore.headerGridDataset.push(newRow);
      console.log('headerGridDataset', publishStore.headerGridDataset);
    });
  };
  console.log('headerGridDataset', publishStore.headerGridDataset);
  const getRowNodeId = (data) => {
    return data.id;
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
    console.log('publishStore.headerButtonGridDataset::', publishStore.headerGridDataset);
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
    // setHeaderGridDataset(updateRows);
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
        <h4 style={{ margin: '1rem 0 0.5rem 1rem' }}>조회영역 항목</h4>
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
          조건 추가
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '20rem', width: '50%', margin: '0 0 0.5rem 1rem' }}>
        <AgGridReact
          rowData={headerGridDataset}
          onGridReady={onGridReady}
          // reactUi={true}
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
        </AgGridReact>
      </div>
    </>
  );
});
