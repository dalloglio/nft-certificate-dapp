import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
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
        <Paper square={true} sx={{ my: 2 }} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>URI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.id}</TableCell>
                  <TableCell>{cert.uri}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
