import { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";

export default function CustomizedSnackbars({ open, children }) {

  return (
    <div>
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {/* This is a success Alert inside a Snackbar! */}
          {children}
        </Alert>
      </Snackbar>
    </div>
  );
}
