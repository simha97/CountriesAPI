import CountrySearch from "@/components/CountrySearch";
import CountrySearchContainer from "@/components/CountrySearchContainer";
import Header from "@/components/Header";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      style={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        maxHeight: "fit-content",
      }}
    >
      <Header />
      <CountrySearch />
      <CountrySearchContainer />
    </Box>
  );
}
