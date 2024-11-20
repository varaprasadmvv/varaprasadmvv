import { useEffect, useMemo, useState, } from 'react';
import AxiosInstance from "./Axios";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import dayjs from 'dayjs';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';

type Project = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  comments: string;
  status: string;
  created: string;
  modified: string;
  original:any;
};

const Home = () => {
  const [mydata, setMyData] = useState<Project[]>([]);
  const [loading, setLoading ] = useState(true);
const GetData = () => {
    AxiosInstance.get(`/project/`)
      .then((res: any) => {
        setMyData(res.data);
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('There was an error fetching the data!', error);
      });
      
  };

  useEffect(() => {
    GetData();
  }, []);
  console.log("data",mydata)

  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        size: 200,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorFn: (row) => dayjs(row.start_date).format('YYYY-MM-DD'),
        header: 'Start date',
        size: 150,
      },
      {
        accessorFn: (row) => dayjs(row.end_date).format('YYYY-MM-DD'),
        header: 'End date',
        size: 150,
      },

    ],
    [],
  );

  return (
    <div>
      {loading ? <p>loading data ...</p> :
      <MaterialReactTable
      columns={columns}
      data={mydata} 
      
      enableRowActions
      renderRowActions={({row}) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
         
          <IconButton  color="secondary" component={Link} to={`edit/${row.original.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton color="error"  component={Link} to={`delete/${row.original.id}`}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
       />
      }
    
    </div>
  );
};

export default Home;
