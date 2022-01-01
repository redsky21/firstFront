import React from "react";
import { Grid } from "@mui/material";
import Top from "./Top";
const Layout = () =>{
    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Top/>
        </Grid>
        <Grid item xs={4}>
            <div>left</div>
        </Grid>
        <Grid item xs={8}>
            <div>main</div>
        </Grid>
        
    </Grid>;
}
export default Layout;