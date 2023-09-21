import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { itemType } from "./FormModal";
import { useEffect, useState } from "react";

const maskPrice = (price: number) => {
  price = parseInt(price.toFixed(0));
  if (isNaN(price)) {
    return "Invalid Price";
  }
  return price.toLocaleString("en-US");
};

function AtrTable({ item, atrLength }: { item?: itemType; atrLength: number }) {
  const [atrItems, setAtrItems] = useState<any[]>([]);

  const cells = [
    { title: "ATR", value: "atrLabel" },
    { title: "Price", value: "price" },
    { title: "Profit", value: "profit" },
    { title: "Stop Loss", value: "stopLoss" },
  ];

  const calculateAtr = () => {
    for (let index = 1; index <= atrLength; index++) {
      if (item) {
        const price = item?.cost + item?.atrValue * index;
        const stopLoss = item?.cost + item?.atrValue * (index - 2);
        const profit = (item?.cost + item?.atrValue * index - item?.cost) * item?.lot;
        setAtrItems((prev) => [
          ...prev,
          {
            atrLabel: `ATR-${index}`,
            price: price.toFixed(2),
            profit: maskPrice(profit),
            stopLoss: stopLoss.toFixed(2),
          },
        ]);
      }
    }
  };

  useEffect(() => {
    if (!item || atrLength > 100) return;
    setAtrItems([]);
    calculateAtr();
  }, [item, atrLength]);

  return (
    <>
      <TableContainer sx={{ maxHeight: 450 }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              {cells.map((cell) => (
                <TableCell key={cell.value} sx={{ top: -1 }}>
                  {cell.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {atrItems.map((atr) => (
              <TableRow key={atr.atrLabel}>
                <TableCell>{atr.atrLabel}</TableCell>
                <TableCell>
                  {atr.price} {item?.currency}
                </TableCell>
                <TableCell>
                  {atr.profit} {item?.currency}
                </TableCell>
                <TableCell>
                  {atr.stopLoss} {item?.currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AtrTable;
