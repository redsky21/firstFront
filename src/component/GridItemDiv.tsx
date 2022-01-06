import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {
  AuGridDataset,
  GridButtonGridDataset,
  HeaderButtonGridDataset,
  HeaderGridDataset,
  HiState,
  ISearchHeaderGrid,
} from 'src/states/EggStore';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
  CellValueChangedEvent,
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  RowDragEvent,
} from 'ag-grid-community';

const rowData2 = [{ type: 'Contained', compClass: 'inquBtn' }] as ISearchHeaderGrid[];

export const GridItemDiv = () => {
  const setAuGridDataset = useSetRecoilState(AuGridDataset);
  const [gridApi, setGridApi] = useState<GridApi>(null);
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>(null);
  const [rowData, setRowData] = useState(null);
  const rowDD = rowData;
  // const defaultClass = [
  //   { defType: 'Contained', clName: 'inquBtn' },
  //   { defType: 'Outlined', clName: 'comBtn' },
  // ];
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
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
    setAuGridDataset(rowData3);
  };
  const onCellValueChanged = ({ node: rowNode, data }: CellValueChangedEvent) => {
    // //console.log('Data', data);
    // if (data.type) {
    //   //   if (!data.compClass) {
    //   //console.log('TTy', data.type);
    //   const defValue = defaultClass.find((defRow) => {
    //     return defRow.defType === data.type;
    //   });
    //   //console.log('defValue', defValue.clName);
    //   rowNode.setData({ ...data, compClass: defValue.clName });
    //   //}
    // }
    refreshDataset();
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
    if (gridApi && gridApi.forEachNode) {
      const updateRows = [];
      gridApi.forEachNode((node, index) => {
        //console.log('node.data:::', node.data);
        // node.data.sortSeq = index;
        const atomLine = Object.assign({}, { ...node.data, sortSeq: index });
        updateRows.push(atomLine);
      });
      setAuGridDataset(updateRows);
    }
    // gridColumnApi.autoSizeAllColumns(false);
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
};
