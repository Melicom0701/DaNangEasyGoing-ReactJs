import { Admin, Resource, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { UserList } from './users';
import { Dashboard } from './Dashboard';

const API = process.env.REACT_APP_ENDPOINT.substring(0, process.env.REACT_APP_ENDPOINT.length - 1);

const dataProvider = jsonServerProvider(API);

const AdminApp = () => (
    <Admin
        dataProvider={dataProvider}
        dashboard={Dashboard}
    >
        {/* <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
        /> */}
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            icon={UserIcon}
            recordRepresentation="name" 
        />
    </Admin>
);

export default AdminApp;
