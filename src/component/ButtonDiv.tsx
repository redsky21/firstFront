import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { checkHello, getHtmlInfo } from 'src/api/bootService';
import {
  AuGridDataset,
  GridButtonGridDataset,
  HeaderButtonGridDataset,
  HeaderGridDataset,
} from 'src/states/EggStore';

export const ButtonDiv = () => {
  const auGridDataset = useRecoilValue(AuGridDataset);
  const headerGridDataset = useRecoilValue(HeaderGridDataset);
  const headerButtonGridDataset = useRecoilValue(HeaderButtonGridDataset);
  const gridButtonGridDataset = useRecoilValue(GridButtonGridDataset);
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
};
