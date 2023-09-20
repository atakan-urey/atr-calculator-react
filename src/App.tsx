import InfoCard from "./InfoCard";
import FormModal from "./FormModal";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

function App() {
  const items = useSelector((state: any) => state.appData);
  const [open, setOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState<any>(null);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setUpdateItem(null);
    setOpen(false);
  };
  const handleUpdateClick = (item: any) => {
    setUpdateItem(item);
    handleModalOpen();
  };
  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl">ATR Calculator</h2>
          <Button variant="contained" onClick={handleModalOpen} endIcon={<AddIcon />}>
            Add Item
          </Button>
        </div>
        <hr />

        <Grid container columnGap={3} rowGap={3}>
          {items.map((item: any) => (
            <Grid key={item.id}>
              <InfoCard handleUpdateClick={handleUpdateClick} item={item} />
            </Grid>
          ))}
        </Grid>
        <FormModal open={open} item={updateItem} handleClose={handleModalClose} />
      </div>
    </>
  );
}

export default App;
