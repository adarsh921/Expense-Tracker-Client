import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

type formData = {
  description: string;
  amount: any;
  category: string;
  payment: string;
};
// const defaultFormData = {
//   description: "",
//   amount: 0,
//   category: "",
//   payment: "",
// };
export const FinancialRecordForm = () => {
  const { records } = useFinancialRecords();
  // const { setRecords } = useFinancialRecords();

  const [formData, setFormData] = useState<formData>({
    description: "",
    amount: 0,
    category: "",
    payment: "",
  });
  const { addRecord } = useFinancialRecords();

  const { user } = useUser();
  console.log(formData);
  function handleChange(e: SelectChangeEvent<string>): void;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  function handleChange(e: any) {
    console.log(e.target.name);
    console.log(e.target.value);
    const fieldName = e.target.name as keyof typeof formData;
    const value: string | number = e.target.value;
    setFormData((currData) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: formData.description,
      amount: formData.amount,
      category: formData.category,
      payment: formData.payment,
    };
    addRecord(newRecord);
    // setRecords(defaultFormData);
  };

  const totalExpense = useMemo(() => { // used useMemo to prevent calculation on every render and forcing it to happen only when necessary
    return records.reduce((sum, record) => sum + record.amount, 0);
  }, [records]);

  // const totalExpense = () => {
  //   const total = records.reduce((sum, record) => sum + record.amount, 0);
  //   return total;
  // };
  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      sx={
        {
          //  marginBottom: 5,
          //  display: "flex",
          // flexDirection: "column",
          // alignItems: "flex-start",
          //  // gap: 0,
        }
      }
    >
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "60%",
        }}
      >
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              backgroundColor: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
        <TextField
          label="Amount"
          name="amount"
          variant="outlined"
          type="number"
          margin="normal"
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            },
          }}
        />
        <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            },
          }}
        >
          {" "}
          <InputLabel variant="filled">Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            },
          }}
        >
          {" "}
          <InputLabel variant="filled">Payment. Method</InputLabel>
          <Select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "40%",
          p: 2,
          pb: 5,
        }}
      >
        <Box sx={{ height: "50%", p: 4 }}>
          <Typography variant="h5">Total Expenses:</Typography>
          <Paper
            elevation={10}
            sx={{
              height: "50%",
              mt: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ fontSize: "large", fontWeight: "bold" }}>
              {totalExpense}₹
            </Box>
          </Paper>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "40px",
          }}
        >
          Add Record
        </Button>
      </Grid>
    </Grid>
  );
};
