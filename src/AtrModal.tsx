import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import { itemType } from "./FormModal";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import AtrTable from "./AtrTable";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  maxWidth: 800,
  width: "95%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

function AtrModal({ open, handleClose, item }: { open: boolean; handleClose: () => void; item?: itemType }) {
  const [stopLoss, setStopLoss] = useState(0);
  const [atrLength, setAtrLength] = useState<number>(10);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = e.target.value;
    if (value <= 100) {
      setAtrLength(value);
    }
  };

  useEffect(() => {
    if (item) {
      setStopLoss(item.cost - item.atrValue * 1.5);
    }
  }, [item]);
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
            <Stack spacing={3}>
              <div className="flex justify-around items-center">
                <div>
                  <h1 className="text-xl font-semibold">{item?.title}</h1>
                  <span className="text-md font-light">{item?.lot} Lot</span>
                </div>
                <div className="flex flex-col">
                  <span>Maliyet: {item?.cost} ₺</span>
                  <span>Stop Loss: {stopLoss.toFixed(2)} ₺</span>
                  <span>ATR: {item?.atrValue}</span>
                </div>
                <div>
                  <TextField
                    onChange={handleInputChange}
                    sx={{ width: 120 }}
                    id="atr-length"
                    size="small"
                    type="number"
                    label="Calculate Length"
                    variant="outlined"
                    defaultValue={atrLength}
                  />
                </div>
              </div>
              <hr />
              <AtrTable item={item} atrLength={atrLength} />
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AtrModal;
