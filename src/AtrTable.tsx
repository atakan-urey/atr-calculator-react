import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { itemType } from "./FormModal";
import { useEffect, useState } from "react";

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
            profit: profit.toFixed(0),
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
            {atrItems.map((item) => (
              <TableRow key={item.atrLabel}>
                <TableCell>{item.atrLabel}</TableCell>
                <TableCell>{item.price} ₺</TableCell>
                <TableCell>{item.profit} ₺</TableCell>
                <TableCell>{item.stopLoss} ₺</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AtrTable;
