import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

interface Option {
  id: string;
  name: string;
}
interface MySelectFieldsProps {
  name: string;
  label: string;
  placeholder?: any;
  control: any;
  width: string | number;
  options: Option[];
}

export default function MySelectFields(props: MySelectFieldsProps) {
  const { name, label, placeholder, control, width, options } = props;

  return (
    <FormControl variant="standard" sx={{ m: 1, width: { width } }}>
      <InputLabel id={`${name}-standard-label`}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <>
            <Select
              labelId={`${name}-standard-label`}
              id={`${name}-standard`}
              value={value}
              onChange={onChange}
              label={label}
              placeholder={placeholder}
              error={!!error}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <em>{option.name}</em>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {error?.message}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}
