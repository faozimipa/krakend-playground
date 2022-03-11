import { FC, ChangeEvent, useState } from 'react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  SelectChangeEvent,
} from '@mui/material';

import Label from 'apps/home/src/app/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'apps/users/src/app/components/BulkActions';
import { User, UserStatus } from 'apps/users/src/app/models/User';

interface UsersDataTableProps {
  className?: string;
  users: User[];
}

interface Filters {
  status?: UserStatus;
}

const getStatusLabel = (userStatus: UserStatus): JSX.Element => {
  const map = {
    blocked: {
      text: 'Blocked',
      color: 'error',
    },
    active: {
      text: 'Active',
      color: 'success',
    },
    inactive: {
      text: 'In Active',
      color: 'warning',
    },
  };

  const { text, color }: any = map[userStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (users: User[], filters: Filters): User[] => {
  return users.filter((user) => {
    let matches = true;

    if (filters.status && user.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  users: User[],
  page: number,
  limit: number
): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

const UsersDataTable: FC<UsersDataTableProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const selectedBulkActions = selectedUsers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: undefined,
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All',
    },
    {
      id: 'active',
      name: 'Active',
    },
    {
      id: 'inactive',
      name: 'In Active',
    },
    {
      id: 'blocked',
      name: 'Blocked',
    },
  ];

  const handleStatusChange = (e: SelectChangeEvent): void => {
    let value: string | null;

    if (e.target.value !== 'all') {
      value = e.target.value as string;
    }

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedUsers(event.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    userId: string
  ): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(users, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Users"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => {
              const isUserSelected = selectedUsers.includes(user.id);
              return (
                <TableRow hover key={user.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUser(event, user.id)
                      }
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.first_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      what is this
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      email here
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(user.created_at), 'dd-mm-yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {formatDistanceToNowStrict(new Date(user.created_at))} ago
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(user.status as UserStatus)}
                    {/* {format(new Date(user.updated_at), 'dd-mm-yyyy')} */}
                    {/* <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(user.updated_at), 'dd-mm-yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {formatDistanceToNowStrict(new Date(user.updated_at))} ago
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30, 50, 100]}
        />
      </Box>
    </Card>
  );
};

UsersDataTable.propTypes = {
  users: PropTypes.array.isRequired,
};

UsersDataTable.defaultProps = {
  users: [],
};

export default UsersDataTable;
