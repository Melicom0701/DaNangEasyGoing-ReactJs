import { useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField, EmailField } from 'react-admin';
import MyUrlField from './MyUrlField';

export const UserList = () => {
    return (
        <List>
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="username" />
                    <EmailField source="email" />
                    <TextField source="phone" />
                    <MyUrlField source="avatar" />
                    <TextField source="createdAt" />
                </Datagrid>
        </List>
    );
};

//['id', 'name', 'username', 'email', 'avatar', 'phone','createdAt']