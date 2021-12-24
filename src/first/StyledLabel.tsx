import { FormLabel , styled } from '@mui/material';
import React from 'react';
import { FormLabelProps } from '@mui/material';

export type TFormLabelProps = {
  myType?: string;
  required ?: boolean;
} & FormLabelProps;

const MyFormLabel = styled(FormLabel)((props:TFormLabelProps)=>({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: (props.myType==='gg'?'red':'green'),
  height: 48,
  padding: '0 30px',

}));

const MyStar = styled(FormLabel)((props:TFormLabelProps)=>({
  color: 'red',
}));

// export default function StyledComponents() {
//   return <MyButton>Styled Components</MyButton>;
// }
const StyledLabel = React.forwardRef<HTMLDivElement, TFormLabelProps>(
  ({ color = 'primary',required, className, children, ...rest }, ref) => {
    return <div> {required&&<MyStar>*</MyStar>} <MyFormLabel  {...rest} >{children}</MyFormLabel></div>;
  },
);
export default StyledLabel;
