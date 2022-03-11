import { Card } from '@mui/material';
import { User } from '../../models/User';
import UsersDataTable from './table';
import ZiLoading from 'libs/components/ZiLoading';
import { useAppSelector, useAppDispatch } from 'libs/hooks';
import { getAll, selectState, setLoading } from '../../UsersDataSlice';
import { useEffect } from 'react';

function UsersDataContent() {
  const data = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading());
    dispatch(getAll());
  }, []);

  return (
    <Card>
      {data.isLoading && <ZiLoading />}
      <UsersDataTable users={data.users} />
    </Card>
  );
}

export default UsersDataContent;
