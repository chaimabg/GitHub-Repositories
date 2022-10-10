import React  from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Stack, AppBar,Toolbar,IconButton,Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});
const NavbarComponent = () => {
    return (<Stack style={{marginBottom:'40px'}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <GitHubIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            GitHub
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Stack>

    );
}
export default NavbarComponent;
