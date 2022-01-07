import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { checkHello, getHtmlInfo } from 'src/api/bootService';
import store from 'src/store';

export const MobxButton = observer(() => {
  const { pubStore } = store;
  const auGridDataset = pubStore.auGridDataset;
  const headerGridDataset = pubStore.headerGridDataset;
  const headerButtonGridDataset = pubStore.headerButtonGridDataset;
  const gridButtonGridDataset = pubStore.gridButtonGridDataset;

  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: '#1EA2A4',
          color: 'white',
          margin: '1rem 0 0.5rem 1rem',
        }}
        onClick={() => {
          console.log('auGridDataset::', auGridDataset);
          console.log('headerGridDataset::', headerGridDataset);
          console.log('headerButtonGridDataset::', headerButtonGridDataset);
          console.log('gridButtonGridDataset::', gridButtonGridDataset);
          const paramData = {
            searchItemList: headerGridDataset,
            searchButtonList: headerButtonGridDataset,
            gridButtonList: gridButtonGridDataset,
            gridItemList: auGridDataset,
          };
          getHtmlInfo(paramData);
        }}
      >
        생성
      </Button>
    </div>
  );
});
