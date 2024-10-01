import CertificateList from "@/components/certificate-list";
import MintCertificate from "@/components/mint-certificate";
import Rewards from "@/components/rewards";
import { BlockchainProvider } from "@/hooks/blockchain";
import { Container, Divider, Grid2 as Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <BlockchainProvider>
      <Container>
        <Typography variant="h4" gutterBottom>
          NFT Certificates
        </Typography>

        <Rewards />

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <CertificateList />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <MintCertificate />
          </Grid>
        </Grid>
      </Container>
    </BlockchainProvider>
  );
}
