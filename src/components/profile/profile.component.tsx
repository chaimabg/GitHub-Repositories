import React  from "react";
import ProfileInfoComponent from "./profile-info.component";
import ProfileRepositoriesComponent from "./profile-repositories.component";
import {Container, Grid} from "@mui/material";

const ProfileComponent = () => {
    return (
        <div>
        <Container fixed>
        <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4} xl={4} sm={12}>
                    <ProfileInfoComponent/>
                </Grid>
                <Grid item xs={12} md={8} lg={8} xl={8} sm={12} >
                    <ProfileRepositoriesComponent/>
                </Grid>
            </Grid>
        </Container>
        </div>
        );
}
export default ProfileComponent;
