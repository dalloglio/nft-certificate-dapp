import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get("/api/certificates");
      setCertificates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div>
      <Typography variant="h5">Certificates</Typography>
      {certificates.length > 0 ? (
        <Paper square sx={{ my: 2 }} elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Uri</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Completion Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>{cert.id}</TableCell>
                    <TableCell>{cert.uri}</TableCell>
                    <TableCell>{cert.studentName}</TableCell>
                    <TableCell>{cert.courseName}</TableCell>
                    <TableCell>
                      {cert.completionDate.split("-").reverse().join("/")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ my: 2 }}>
          No certificate minted
        </Alert>
      )}
    </div>
  );
};

export default CertificateList;
