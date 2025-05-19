import { Typography, Tabs, Tab, Grid, Stack } from "@mui/material";

type Props = {
  setTabIndex: (newValue: number) => void;
  tabIndex: number;
};

const Header = ({ tabIndex, setTabIndex }: Props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h6" color="#232362">SpaceX by Cristian Soria</Typography>
      </Grid>

      <Grid size={{ xs: 12, md: "auto" }}>
        <Stack direction={"row"} spacing={4}>
          <Tabs
            value={tabIndex}
            onChange={(_, newValue) => setTabIndex(newValue)}
            aria-label="Menu-tab"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Lanzamientos" />
            <Tab label="Favoritos" />
            <Tab label="Bases de lanzamientos" />
          </Tabs>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Header;
