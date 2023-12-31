import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { newItem, updateItem } from "./appDataReducer";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  cost: Yup.number().required("Required"),
  lot: Yup.number().required("Required"),
  atrValue: Yup.number().required("Required"),
});

export type itemType = {
  id: number;
  title: string;
  cost: number;
  lot: number;
  atrValue: number;
  currency: string;
};

const initialValues = {
  title: "",
  cost: 0,
  lot: 0,
  atrValue: 0,
  currency: "₺",
};

function FormModal({ open, handleClose, item }: { open: boolean; handleClose: () => void; item?: itemType }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(!item ? newItem(values) : updateItem({ ...values, id: item.id }));
      handleClose();
      setTimeout(() => {
        formik.resetForm();
      }, 150);
    },
  });
  useEffect(() => {
    if (item) {
      formik.setValues(item);
    }
  }, [item]);

  useEffect(() => {
    open
      ? item && formik.setValues(item)
      : setTimeout(() => {
          formik.resetForm();
        }, 150);
  }, [open, item]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack spacing={2}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add Item
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    {...formik.getFieldProps("title")}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <Grid container>
                    <Grid item sm={8}>
                      <TextField
                        id="cost"
                        type="number"
                        label="Cost"
                        variant="outlined"
                        {...formik.getFieldProps("cost")}
                        error={formik.touched.cost && Boolean(formik.errors.cost)}
                        helperText={formik.touched.cost && formik.errors.cost}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                          {...formik.getFieldProps("currency")}
                          defaultValue={"₺"}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Currency"
                        >
                          <MenuItem value={"₺"}>₺</MenuItem>
                          <MenuItem value={"$"}>$</MenuItem>
                          <MenuItem value={"€"}>€</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <TextField
                    id="lot"
                    type="number"
                    label="Lot"
                    variant="outlined"
                    {...formik.getFieldProps("lot")}
                    error={formik.touched.lot && Boolean(formik.errors.lot)}
                    helperText={formik.touched.lot && formik.errors.lot}
                  />
                  <TextField
                    id="atr-value"
                    type="number"
                    label="ATR Value"
                    variant="outlined"
                    {...formik.getFieldProps("atrValue")}
                    error={formik.touched.atrValue && Boolean(formik.errors.atrValue)}
                    helperText={formik.touched.atrValue && formik.errors.atrValue}
                  />
                  <Button type="submit" variant="contained">
                    {item ? "Update" : "Add"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default FormModal;
