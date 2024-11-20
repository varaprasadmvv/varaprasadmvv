
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface MyMultilineFieldsProps {
  label: string;
  name: string;
  rows: number;
  control:any;
  placeholder?: string;
  width:string | number;

}

export default function MyMultilineFields(props: MyMultilineFieldsProps) {
  const { label, name, placeholder, control,width } = props;
  

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
          id="standard-multiline-static"
          label={label}
          multiline
          rows={4}
          sx={{width:{width}}}
          variant="standard"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error ={!!error}
          helperText ={ error?.message}

          />
      )}
    />
  );
}
