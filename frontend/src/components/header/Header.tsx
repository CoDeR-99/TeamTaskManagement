import Grid from "@mui/material/Grid";
import './Header.css'

const Header = () => {
  return (
    <div className="headerContainer">
      <Grid container spacing={2}>
        <Grid size={6}>
            <div>Task Manager</div>
        </Grid>
        <Grid size={6}>
            <div>Search Bar</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
