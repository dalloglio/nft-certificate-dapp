import { useBlockchain } from "@/hooks/blockchain";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const MintCertificate = () => {
  const { contract, signer } = useBlockchain();
  const [studentName, setStudentName] = useState("Ricardo Pires");
  const [courseName, setCourseName] = useState("Blockchain");
  const [completionDate, setCompletionDate] = useState("2024-09-01");
  const [alert, setAlert] = useState({ severity: null, message: null });

  const mintCertificate = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.mintCertificate(
        await signer.getAddress(),
        1,
        studentName,
        courseName,
        completionDate
      );
      await tx.wait();
      setAlert({
        severity: "success",
        message: "Certificate minted with success!",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        severity: "error",
        message: "Error on minting certificate",
      });
    }
  };

  return (
    <div>
      <Typography variant="h5">Mint Certificate</Typography>
      <Paper square sx={{ p: 2, my: 2 }} elevation={2}>
        <form onSubmit={mintCertificate} autoComplete="off">
          <TextField
            label="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            variant="filled"
            margin="normal"
            fullWidth
            required
          />

          <TextField
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            variant="filled"
            margin="normal"
            fullWidth
            required
          />

          <TextField
            type="date"
            label="Completion Date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            variant="filled"
            margin="normal"
            fullWidth
            required
          />

          <Button type="submit" variant="contained" size="large" fullWidth>
            Mint Certificate
          </Button>
        </form>
      </Paper>
      {alert.message && (
        <Alert severity={alert.severity}>{alert.message}</Alert>
      )}
    </div>
  );
};

export default MintCertificate;
