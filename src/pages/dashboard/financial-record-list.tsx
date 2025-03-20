import { useState } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

export const FinancialRecordList = () => {
  const { records, setRecords, updateRecord, fetchRecords, deleteRecord } =
    useFinancialRecords();
  // console.log(records);

  const [editValue, setEditValue] = useState("");
  const [isEditing, setIsEditing] = useState("");
  const [colEdit, setColEdit] = useState(null);
  const [edit, setEdit] = useState(false);
  const handleChange = (e: any) => {
    setEditValue(e.target.value);
  };
  const handleClick = ( rowId: any, col: any) => {
    // setRecords((prev: any) =>
    //   prev.map((record: any) =>
    //     rowId === record._id
    //       ? { ...record, [e.target.name]: e.target.value }
    //       : record
    //   )
    // );

    setIsEditing(rowId);
    setColEdit(col);
    setEdit((prev) => !prev);
  };

  const handleEdit = (
    { name, value }: { name: string; value: string },
    rowId: any
  ) => {
    setRecords((prev: any) => {
      const updatedRecords = prev.map((record: any) =>
        rowId === record._id ? { ...record, [name]: value } : record
      );

      const recordToUpdate = updatedRecords.find(
        (rec: any) => rec._id === rowId
      );

      if (recordToUpdate) {
        updateRecord(rowId, recordToUpdate);
        fetchRecords();
      } else {
        console.error("Record not found");
      }
      return updatedRecords;
    });

    // const recordToUpdate = records.find((rec) => rec._id === rowId);
    // if (recordToUpdate) {
    //   updateRecord(rowId, recordToUpdate);
    //   // fetchRecords();
    // } else {
    //   console.error("Record not found");
    // }

    // fetchRecords();
  };
  // console.log(records);

  const handleDelete = (id: any) => {
    setRecords((prevRecords: any) => {
      const newRecords = prevRecords.filter((rec: any) => rec._id !== id);
      return newRecords;
    });
    deleteRecord(id);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>
              Description
            </TableCell>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>Amount</TableCell>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>Category</TableCell>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>
              Payment Method
            </TableCell>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>Date</TableCell>
            <TableCell sx={{ backgroundColor: "#f5f5f5" }}>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {records?.map((record) => (
            <TableRow key={record._id}>
              <TableCell
                onClick={() => handleClick( record._id, record.description)}
              >
                {edit &&
                isEditing === record._id &&
                colEdit === record.description ? (
                  <TextField
                    name="description"
                    value={editValue}
                    onChange={handleChange}
                    autoFocus
                    // onBlur={() => handleBlur(record._id)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              handleEdit(
                                { name: "description", value: editValue },
                                record._id
                              )
                            }
                          >
                            Save
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  record.description
                )}
              </TableCell>
              <TableCell
                onClick={() => handleClick( record._id, record.amount)}
              >
                {edit &&
                isEditing === record._id &&
                colEdit === record.amount ? (
                  <TextField
                    name="amount"
                    value={editValue}
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              handleEdit(
                                { name: "amount", value: editValue },
                                record._id
                              )
                            }
                          >
                            Save
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  record.amount
                )}
              </TableCell>
              <TableCell
                onClick={() => handleClick( record._id, record.category)}
              >
                {edit &&
                isEditing === record._id &&
                colEdit === record.category ? (
                  <TextField
                    name="category"
                    value={editValue}
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              handleEdit(
                                { name: "category", value: editValue },
                                record._id
                              )
                            }
                          >
                            Save
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  record.category
                )}
              </TableCell>
              <TableCell
                onClick={() => handleClick( record._id, record.payment)}
              >
                {edit &&
                isEditing === record._id &&
                colEdit === record.payment ? (
                  <TextField
                    name="payment"
                    value={editValue}
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              handleEdit(
                                { name: "payment", value: editValue },
                                record._id
                              )
                            }
                          >
                            Save
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  record.payment
                )}
              </TableCell>
              <TableCell>{new Date(record.date).toDateString()}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
