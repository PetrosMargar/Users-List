import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Stack } from "@mui/material";
import { deleteUser } from '../store/usersListSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import EditModal from './../components/EditModal';

const Community = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [updateData, setUpdateData] = React.useState<{ id: number, email: string, url: string, loginName: string }>({ id: 0, email: '', url: '', loginName: '' });

  const selectedUsers = useAppSelector(state => {
    const selectedUsersId = state.usersList.selectedUserIds;
    if (selectedUsersId.length === 0)
      return [];
    return state.usersList.data.filter(user => selectedUsersId.includes(user.id))
  });

  const editHandler = (e: React.MouseEvent, row: any) => {
    e.stopPropagation();
    setModalOpen(true);

    setUpdateData({
      id: row.id,
      email: row.email,
      url: row.url,
      loginName: row.login
    });
  }

  const modalCloseHandler = () => {
    setModalOpen(false);
  }
  const deleteHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    dispatch(deleteUser(id));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerClassName: "gridHeader", width: 100, align: "center", headerAlign: "center" },
    {
      field: 'avatar_url', headerName: 'Avatar', headerClassName: "gridHeader", width: 150, sortable: false, align: "center", headerAlign: "center", filterable: false,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <img src={params.value} style={{ height: "35px", width: "35px" }} />
          </div>
        );
      }
    },
    { field: 'login', headerName: 'Login Name', headerClassName: "gridHeader", width: 150, align: "center", headerAlign: "center" },
    {
      field: 'html_url', headerName: 'GitHub page', headerClassName: "gridHeader", width: 550, sortable: false, filterable: false, align: "center", headerAlign: "center",
      renderCell: (params: GridValueGetterParams) => {
        return (
          <a href={params.value} target={"_blank"} className="rowLinkStyle">{params.value}</a>
        );
      }
    },
    {
      field: 'action', headerName: 'Actions', sortable: false, filterable: false, width: 350, headerClassName: "gridHeader", align: "right", headerAlign: "center",
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={(e) => editHandler(e, params.row)}>Edit</Button>
            <Button variant="contained" onClick={(e) => deleteHandler(e, params.row.id)}>Delete</Button>
          </Stack>
        )
      },
    },
  ];

  return (
    <div className="communityContainer">
      {modalOpen && <EditModal handleClose={modalCloseHandler} userData={updateData} />}
      <DataGrid
        rows={selectedUsers}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={(params) => `${params.row.id}`}
        hideFooter={true}
      />
    </div>
  )
}

export default Community;