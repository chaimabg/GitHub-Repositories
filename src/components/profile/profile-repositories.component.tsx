import React, { useEffect, useState} from "react";
import "./profile.css";
import {
    Box, Button, Chip,
    Divider,
    InputAdornment,
    OutlinedInput,
    Tooltip,
    Typography,
    CircularProgress
} from "@mui/material";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import moment from "moment";
import GithubService from "../../services/github.service";
import styles from './styles.module.css';


const ProfileRepositoriesComponent = () => {
    const [repositories, setRepositories] = useState<any[]>([]);
    const [searchValue, setSearchValue]:[string, (search: string) => void] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    };

    useEffect(() => {
        GithubService.getRepositories().then(response => {
            setRepositories(response.data);
        });
    }, [repositories]);


    const formatDate = (date: any) => {
        return moment(date).format("MMM Do YY");
    }

    return (
        <div>
            <React.Fragment>
                <Box className={styles.box}>
                    <Typography>
                        <Button
                            className={styles.navButton}
                            variant="contained"
                            startIcon={<BookOutlinedIcon/>}
                        >
                            Repositories <Chip label={repositories.length} size="small" className={styles.ml5} />
                        </Button>
                    </Typography>
                </Box>
            </React.Fragment>
            <Box className={styles.box}>

                <OutlinedInput id="search-input"
                               size="small"
                               className={styles.mb15}
                               placeholder="Find a repository..."
                               onChange={handleChange}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <SearchSharpIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                   </InputAdornment>
                               }
                               fullWidth/>

            </Box>


            <div className={styles.fullWidth}>
                {repositories.length ? repositories.map((repository, index) => {
                            if (searchValue === "" || repository.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
                           return  (  <div key={index}>
                                    <Tooltip title="Open repository" placement="bottom-start">


                                        <a href={repository.html_url} target="_blank" rel="noreferrer" className="repository-link">
                                            <h2>{repository.name}
                                                <Chip className={styles.ml5}
                                                      label={repository.private ? "private" : "public"}
                                                      variant="outlined" size="small"/></h2>
                                        </a>
                                    </Tooltip>
                                    <p>{repository.description}</p>
                                    <p>updated {formatDate(repository.updated_at)}</p>
                                    <Divider/>
                                </div>)
                            }else {
                                return (<></>)
                            }
                  
                        } 
                    ) :
                    <div>
                        <CircularProgress color="inherit" className={styles.m10}/>
                    </div>

                }

            </div>

        </div>

    );
}
export default ProfileRepositoriesComponent;
