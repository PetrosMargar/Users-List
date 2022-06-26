import React from 'react';
import { Fragment } from 'react';
import NavBar from './Navbar';
import { Octokit } from "@octokit/core";
import { setUsers } from '../store/usersListSlice'
import { useAppDispatch } from '../store/hooks';

const Layout = (props: any) => {
  const dispatch = useAppDispatch();

  const getUsersList = async () => {
    const octokit: Octokit = new Octokit({ auth: `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` });
    try {
      const res = await octokit.request('GET /users', {});
      if (res.status !== 200) {
        throw new Error("Response Failed!");
      }
      return res.data;
    } catch (error) {
      alert(error)
    }
  };

  React.useEffect(() => {
    getUsersList().then((data) => {
      dispatch(setUsers(data));      
    })
  }, [])
  return (
    <Fragment>
      <NavBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;