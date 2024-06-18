import { Container } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { request } from '@esri/arcgis-rest-request';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MaterialTable from "material-table";


const AccountTable = ({ session, currentUser, portal }) => {
  const [users, setUsers] = useState([]);

  const tableHeader = [
    "Member",
    "Email",
    "Last Login",
    "User Type",
    "Role",
    ""
  ];

  const roleRef = {
    org_admin: "Administrator"
  };

  function getRole(currentUser) {
    let userRole = currentUser?.role;
    return roleRef[userRole] || userRole;
  }

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'lastLogin', headerName: 'Last Login', width: 130 },
    { field: 'userType', headerName: 'User Type', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const fetchUsers = useCallback(() => {
    if (currentUser && portal) {
      let portalId = portal.id;
      console.log("Fetching users from id", portalId);
      request(`https://quevera.maps.arcgis.com/sharing/rest/portals/${portalId}/users`, { authentication: session })
        .then(response => {
          const usersData = response.users.map(user => ({
            id: user.username, // Assign a unique id to each row
            fullName: user.fullName,
            email: user.email,
            lastLogin: moment(user.lastLogin).format('MM/DD/yyyy'), // Format lastLogin here
            userType: user.userType,
            role: getRole(user)
          }));
          setUsers(usersData);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      setUsers([]);
    }
  }, [currentUser, portal, session]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container>
      <DataGrid
        rows={users} // Correct prop name is `rows`
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      


    </Container>
  );
};

export default AccountTable;
