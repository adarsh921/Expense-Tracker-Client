import { Box, Typography } from "@mui/material";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";

export const Dashboard = () => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "20px",
        p: 2,
        minHeight: "auto",
        maxHeight: "500px",
        backgroundColor: "#EBE3CF",
        overflow: "auto",
        clipPath: "inset(1px round 20px)",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333333" }}>
          Expense-Record
        </Typography>
      </Box>
      <FinancialRecordForm />
      <FinancialRecordList />
    </Box>
  );
};
