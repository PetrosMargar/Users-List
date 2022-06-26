import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../store/hooks';
import { updateUser } from '../store/usersListSlice';
import { Box } from '@mui/material';

type modalProps = {
  handleClose: () => void;
  userData: { id: number, email: string, url: string, loginName: string };
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose, userData }: modalProps) {
  const [email, setEmail] = React.useState<string>(userData.email || '');
  const [loginName, setLoginName] = React.useState<string>(userData.loginName || '');
  const [userUrl, setUserUrl] = React.useState<string>(userData.url || '');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.SyntheticEvent | Event) => {
    event.preventDefault();
    const newUser = {
      id: userData.id,
      email,
      html_url: userUrl,
      login: loginName,
    };
    dispatch(updateUser(newUser));
    handleClose();
  }
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5">
            Edit user
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
            >
              Update
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}