import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function Filter({ data, onFilter }) {
  const [startId, setStartId] = useState(1);
  const [endId, setEndId] = useState(50);

  useEffect(() => {
    onFilter(data.filter((item) => item.Id >= startId && item.Id <= endId));
  }, [data, startId, endId]);

  return (
    <div>
      <TextField
        type="number"
        value={startId}
        onChange={(e) => {
          const Svalue = Number(e.target.value);
          if (Svalue >= 1 && Svalue <= 999 && Svalue < endId) {
            setStartId(Svalue);
          }
        }}
        label="Start id"
        variant="outlined"
        sx={{ margin: 1 }}
      />
      <TextField
        type="number"
        value={endId}
        onChange={(e) => {
          const Evalue = Number(e.target.value);
          if (Evalue > 0 && Evalue <= 1000 && Evalue >= startId) {
            setEndId(Evalue);
          }
        }}
        label="End id"
        variant="outlined"
        sx={{ margin: 1 }}
      />
    </div>
  );
}
