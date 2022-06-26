import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { addUser } from '../store/usersListSlice'
import { useAppDispatch } from '../store/hooks';

const NewUser = () => {
  const [email, setEmail] = useState<string>('');
  const [loginName, setLoginName] = useState<string>('');
  const [userUrl, setUserUrl] = useState<string>('');
  const [isSnackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent | Event) => {
    event.preventDefault();
    const newUser = {
      id: ~~(Math.random() * 1000),
      email,
      html_url: userUrl,
      login: loginName,
      type: "User"
    };
    dispatch(addUser(newUser));
    setEmail('');
    setLoginName('');
    setUserUrl('');
    setSnackBarOpen(true);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSnackBarOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Add new user
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "30px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="E-mail"
                  name="E-mail"
                  variant="outlined"
                  required
                  type={"email"}
                  fullWidth
                  id="E-mail"
                  label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type={"text"}
                  id="loginName"
                  label="Login Name"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type={"url"}
                  id="Github url"
                  label="Github url"
                  value={userUrl}
                  onChange={(e) => setUserUrl(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ height: "50px" }}
            disabled={email === '' || loginName === '' || userUrl === ''}
          >
            Create
          </Button>
          <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackBarOpen(false)}
            message="User created!"
            action={action}
            sx={{
              width: 400,
              color: "secondary",
              "& .MuiSnackbarContent-root": { backgroundColor: "green" }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </form>
      </div>
    </Container>
  );
}

export default NewUser;