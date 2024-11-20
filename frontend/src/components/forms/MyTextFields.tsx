
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface MyTextFieldsProps {
  label: string;
  name: string;
  placeholder?: string;
  control:any;
  width:string | number;
}

export default function MyTextFields(props: MyTextFieldsProps) {
  const { label, name, placeholder, control, width} = props;
  

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="standard-basic"
          label={label}
          variant="standard"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          
          sx ={{width:{width}}}
          error ={!!error}
          helperText ={ error?.message}
               />
      )}
    />
  );
}