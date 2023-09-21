import InfoCard from "./InfoCard";
import FormModal, { itemType } from "./FormModal";
import { Alert, Button, Grid } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import AtrModal from "./AtrModal";

function App() {
  const items = useSelector((state: any) => state.appData);

  const [open, setOpen] = useState(false);
  const [atrOpen, setAtrOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setTimeout(() => {
      setSelectedItem(null);
    }, 150);
    setOpen(false);
  };
  const handleUpdateClick = (item: itemType) => {
    setSelectedItem(item);
    handleModalOpen();
  };

  const handleAtrClick = (item: itemType) => {
    setSelectedItem(item);
    setAtrOpen(true);
  };

  const handleAtrModalClose = () => {
    setTimeout(() => {
      setSelectedItem(null);
    }, 150);
    setAtrOpen(false);
  };

  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <div className="flex items-center gap-5 flex-wrap">
          <h2 className="text-2xl">ATR Calculator</h2>
          <Button variant="contained" onClick={handleModalOpen} endIcon={<AddIcon />}>
            Add Item
          </Button>
          <Alert severity="info" variant="outlined">
            The values ​​contained herein are not investment advice.
          </Alert>
        </div>
        <hr />
        <Grid container columnGap={3} rowGap={3}>
          {items.map((item: itemType) => (
            <Grid key={item.id}>
              <InfoCard handleUpdateClick={handleUpdateClick} handleAtrClick={handleAtrClick} item={item} />
            </Grid>
          ))}
        </Grid>
        <FormModal open={open} item={selectedItem} handleClose={handleModalClose} />
        <AtrModal open={atrOpen} item={selectedItem} handleClose={handleAtrModalClose} />
      </div>
    </>
  );
}

export default App;
