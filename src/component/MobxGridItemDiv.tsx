import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
  CellValueChangedEvent,
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  RowDragEvent,
} from 'ag-grid-community';
import { IAuiGridColBaseProps } from 'src/states/EggStore';
import { observer } from 'mobx-react-lite';
import store from 'src/store';
import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export const MobxGridItemDiv = observer(() => {
  const { pubStore } = store;
  // const { pubStore } = useStores();

  const auGridDataset = [...pubStore.auGridDataset];

  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const [rowData, setRowData] = useState(null);
  const rowDD = rowData;
  const defaultClass = [{ dataType: 'numeric', clName: 'auiRight' }];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const addSearchGridRow = () => {
    //console.log('rowData2:::', rowData2);
    // rowData2.push(newRow);
    runInAction(() => {
      const newRow: IAuiGridColBaseProps = { rowId: uuidv4(), sumFlag: 'N' };
      pubStore.auGridDataset.push(newRow);
    });
  };

  const onCellValueChanged = ({ node: rowNode, data, colDef }: CellValueChangedEvent) => {
    console.log('colDef', colDef);
    console.log('data', data);
    if (data.dataType && colDef && colDef.field === 'dataType') {
      const defValue = defaultClass.find((defRow) => {
        return defRow.dataType === data.dataType;
      });
      const gridRow = pubStore.auGridDataset.find((row) => {
        return row.rowId === data.rowId;
      });
      if (defValue && defValue.clName) {
        gridRow.style = defValue.clName;
      } else {
        gridRow.style = null;
      }
      if (data.dataType === 'numeric') {
        gridRow.sumFlag = 'Y';
        gridRow.formatString = '#,##0';
      } else {
        gridRow.sumFlag = 'N';
        gridRow.formatString = null;
      }
      gridApi.refreshCells();
      console.log('auGridDataset', auGridDataset);
    }
  };

  // const onCellValueChanged = ({ node: rowNode, data }: CellValueChangedEvent) => {
  //   // //console.log('Data', data);
  //   if (data.dataType) {
  //     //   if (!data.compClass) {
  //     //console.log('TTy', data.type);
  //     const defValue = defaultClass.find((defRow) => {
  //       return defRow.dataType === data.dataType;
  //     });
  //     //console.log('defValue', defValue.clName);
  //     rowNode.setData({
  //       ...data,
  //       style: defValue ? defValue.clName : null,
  //       sumFlag: data.dataType === 'numeric' ? 'Y' : 'N',
  //     });
  //     //}
  //   }
  // };
  const onRowDragMove = (event: RowDragEvent) => {
    runInAction(() => {
      pubStore.headerButtonGridDataset.length = 0;
      // gridApi.forEachNode((node, index) => {
      //   pubStore.headerButtonGridDataset.push(node.data);
      // });
      pubStore.syncDataset('auGridDataset', gridApi);
    });
  };
  // useEffect(() => {
  //   console.log('auGridDataset changed:::', auGridDataset);
  // }, [auGridDataset]);

  const getFormatList = (params) => {
    console.log('params', params);
    console.log('params.data', params.data);
    if (params.data && params.data.dataType) {
      if (params.data.dataType === 'numeric') {
        return {
          values: ['', '###0', '####', '#,##0', '#,###', '#,##0.0', '#,##0.#', '#,##0.00', '#,##0.0#'],
        };
      } else if (params.data.dataType === 'date') {
        return {
          values: ['yyyy-mm-dd', 'yyyy-mm-dd HH:MM:ss', 'yyyy-mm', 'yyyy'],
        };
      } else {
        return {
          values: [],
        };
      }
    } else {
      return {
        values: [],
      };
    }
  };

  // var carMappings = {
  //   tyt: 'Toyota',
  //   frd: 'Ford',
  //   prs: 'Porsche',
  //   nss: 'Nissan',
  // };

  const carMappingArray = [
    { code: 'tyt', meaning: 'Toyota' },
    { code: 'frd', meaning: 'Ford' },
    { code: 'prs', meaning: 'Porsche' },
    { code: 'nss', meaning: 'Nissan' },
  ];

  const carMappings = carMappingArray.reduce((newObj, obj) => {
    newObj[obj.code] = obj.meaning;
    return newObj;
  }, {});

  const carBrands = extractValues(carMappings);

  function extractValues(mappings) {
    return Object.keys(mappings);
  }

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
        <h4 style={{ margin: '1rem 0 0.5rem 1rem' }}>AUI Grid 셋팅</h4>
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
          항목 추가
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '15rem', width: '50%', margin: '0 0 0.5rem 1rem' }}>
        <AgGridReact
          rowData={auGridDataset}
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
          onFirstDataRendered={(event: FirstDataRenderedEvent) => {
            event.columnApi.autoSizeAllColumns(false);
          }}
        >
          <AgGridColumn
            headerName=""
            rowDrag={true}
            maxWidth={50}
            editable={false}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn headerName="Label" field="headerText" resizable={true}></AgGridColumn>
          <AgGridColumn headerName="Data Field" field="dataField" resizable={true}></AgGridColumn>
          <AgGridColumn
            headerName="Group DataField"
            field="groupDataField"
            // width={300}
            resizable={true}
          ></AgGridColumn>

          <AgGridColumn
            headerName="DataType"
            field="dataType"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ['string', 'numeric', 'date', 'boolean'],
            }}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn headerName="class" field="style" resizable={true}></AgGridColumn>
          <AgGridColumn headerName="Width" field="width" resizable={true}></AgGridColumn>

          <AgGridColumn
            headerName="Format"
            field="formatString"
            cellEditor="agSelectCellEditor"
            cellEditorParams={(params) => {
              return getFormatList(params);
            }}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn headerName="header class" field="headerStyle" resizable={true}></AgGridColumn>
          <AgGridColumn
            headerName="합계"
            field="sumFlag"
            cellEditor="agSelectCellEditor"
            cellEditorParams={{
              values: ['Y', 'N'],
            }}
            resizable={true}
          ></AgGridColumn>
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
                      pubStore.syncDataset('auGridDataset', gridApi);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              );
            }}
          ></AgGridColumn>
          {/* <AgGridColumn
            field="make"
            cellEditor="select"
            cellEditorParams={{ values: carBrands }}
            filter="agSetColumnFilter"
            refData={carMappings}
          /> */}
        </AgGridReact>
      </div>
    </>
  );
});
