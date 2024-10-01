import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Rewards = () => {
  const [rewards, setRewards] = useState(0);

  const fetchRewards = async () => {
    try {
      const response = await axios.get("/api/rewards");
      setRewards(response.data.rewards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Rewards</Typography>
      <Typography>Total points: {rewards}</Typography>
    </Box>
  );
};

export default Rewards;
