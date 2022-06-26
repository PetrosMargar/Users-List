import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from "@mui/material";
import { useAppSelector } from '../store/hooks';

const UserProfile = () => {
  const [userDetailsValue, setUserDetailsValue] = React.useState<any[]>([]);
  const [userDetailsName, setUserDetailsName] = React.useState<any[]>([]);
  const params = useParams();
  const userId = params.userId as string;
  const userUrl: string = useAppSelector(state => {
    const user = state.usersList.data.find(user => user.id === parseInt(userId));
    return user == null ? null : user.url;
  }
  );

  useEffect(() => {
    if (userUrl != null) {
      fetch(userUrl)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("Oops! Response Failed!");
          }
          return response.json();
        })
        .then((res) => {
          setUserDetailsName(Object.keys(res));
          setUserDetailsValue(Object.values(res));
        })
        .catch(e => alert(e.message));
    }
  }, [])
  
  return (
    <>
      {userUrl == null && <p>User Not Found</p>}
      <Box sx={{ height: "100%", width: '100%', display: "flex", justifyContent: "center" }} component={Paper} >
        <div style={{ display: 'flex' }}>
        <Typography component="h1" variant="h5">
          User Details
        </Typography>
          <div>
            {userDetailsName.map((row, index) => (
              <div key={index}>
                <p>{row}</p>
                <Divider orientation="horizontal" variant="middle" flexItem sx={{ bgcolor: "secondary.light" }} />
              </div>
            ))}
          </div>
          <div>
            {userDetailsValue.map((row, index) => (
              <div key={index}>
                {!row && <p>-</p>}
                <p>{row}</p>
                <Divider orientation="horizontal" variant="middle" flexItem sx={{ bgcolor: "secondary.light" }} />
              </div>
            ))}
          </div>
        </div>
      </Box>
    </>
  )
}

export default UserProfile;