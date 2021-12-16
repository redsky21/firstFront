import { Button, styled } from '@mui/material';
import React from 'react';
import { ButtonProps } from '@mui/material';

export type TButtonProps = {
  myType?: string;
} & ButtonProps;

const MyButton = styled(Button)((props:TButtonProps)=>({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: (props.myType==='gg'?'red':'green'),
  height: 48,
  padding: '0 30px',

}));

// export default function StyledComponents() {
//   return <MyButton>Styled Components</MyButton>;
// }
const StyledComponents = React.forwardRef<HTMLDivElement, TButtonProps>(
  ({ color = 'primary', className, children, ...rest }, ref) => {
    return <MyButton  {...rest}>{children}</MyButton>;
  },
);
export default StyledComponents;
