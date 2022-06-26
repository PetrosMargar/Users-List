import React from "react";
import { DataGrid, GridColDef, GridRow, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import clsx from "clsx";
import { selectUserList, setSelectedUserIds, selectedUserIds } from '../store/usersListSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [pageSize, setPageSize] = React.useState<number>(10);
  const navigate = useNavigate();
  const rowsData: any[] = useAppSelector(selectUserList);
  const selectedUsersIds: any[] = useAppSelector(selectedUserIds);

  const dispatch = useAppDispatch();
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
  ];

  const rowClickHandler = (id: number) => {
    navigate(`/users/${id}`)
  }

  const rowCheckboxHandler = (ids: GridSelectionModel) => {
    dispatch(setSelectedUserIds(ids));
  }

  function CustomRow(props: any) {
    const { className, index, ...other } = props;

    return (
      <GridRow
        index={index}
        className={clsx(className, index % 2 === 0 ? "odd" : "even")}
        {...other}
      />
    );
  }

  return (
    <div style={{ height: 635, width: '100%' }}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(rowData) => rowClickHandler(rowData.row.id)}
        getRowClassName={(params) => `${params.row.id}`}
        components={{ Row: CustomRow }}
        onSelectionModelChange={rowCheckboxHandler}
        loading={rowsData.length === 0}
        selectionModel={selectedUsersIds}
        isRowSelectable={(params) => {
          return !(selectedUsersIds.length === 10 && !selectedUsersIds.includes(params.id));
        }}
      />
    </div>
  )
}

export default UserList;