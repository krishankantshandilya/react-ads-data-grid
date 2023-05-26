import * as React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

const AutoCompleteInput = ({ ...rest }) => {
  return (
    <Autocomplete
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} />}
      {...rest}
    />
  );
};

export default AutoCompleteInput;
