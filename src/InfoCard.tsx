import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { deleteItem } from "./appDataReducer";
import { itemType } from "./FormModal";

type InfoCardProps = {
  item: {
    id: number;
    title: string;
    cost: number;
    lot: number;
    atrValue: number;
  };
  handleUpdateClick: (item: itemType) => void;
  handleAtrClick: (item: itemType) => void;
};

function InfoCard({ item, handleUpdateClick, handleAtrClick }: InfoCardProps) {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    if (confirm("Are you sure?")) dispatch(deleteItem(item.id));
  };
  return (
    <>
      <Card sx={{ width: 300 }}>
        <CardHeader
          title={item.title}
          subheader={item.lot + " Lot"}
          action={
            <div className="flex flex-col">
              <span>Maliyet: {item.cost} ₺</span>
              <span>ATR: {item.atrValue}</span>
            </div>
          }
        />
        <CardActions className="justify-end gap-0">
          <Button onClick={() => handleAtrClick(item)} variant="outlined">
            ATR
          </Button>
          <IconButton onClick={() => handleUpdateClick(item)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default InfoCard;
