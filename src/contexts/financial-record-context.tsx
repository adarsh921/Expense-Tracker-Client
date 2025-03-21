import { createContext, useState, useContext, useEffect } from "react";

import { useUser } from "@clerk/clerk-react";
interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  payment: string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
  setRecords: (record: any) => void;
  fetchRecords: () => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch(
        "https://expense-tracker-server-theta-umber.vercel.app/financial-records",
        {
          method: "POST",
          body: JSON.stringify(record),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prevRecords) => [...prevRecords, newRecord]);
        // console.log("Record added successfully:", newRecord);
      } else {
        console.log("Server response not ok:", response.status);
      }
    } catch (error) {
      console.log("Failed to add record:", error);
    }
  };

  const fetchRecords = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }
    const response = await fetch(
      `https://expense-tracker-server-theta-umber.vercel.app/financial-records/getAllByUserId/${user?.id}`
    );

    if (response.ok) {
      const records = await response.json();
      console.log(records);

      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const updateRecord = async (id: string, record: FinancialRecord) => {
    try {
      const response = await fetch(
        `https://expense-tracker-server-theta-umber.vercel.app/financial-records/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(record),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const records = await response.json();
        console.log(records);
      }
    } catch (error) {
      console.log("FAILED TO UPDATE RECORD", error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(
        `https://expense-tracker-server-theta-umber.vercel.app/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{
        records,
        addRecord,
        setRecords,
        updateRecord,
        fetchRecords,
        deleteRecord,
      }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordProvider"
    );
  }

  return context;
};
