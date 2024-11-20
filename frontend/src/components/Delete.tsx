import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
}

const Delete: React.FC = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

  const [myData, setMyData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const GetData = async () => {
    try {
      const res = await AxiosInstance.get(`project/${MyId}`);
      setMyData(res.data);
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  useEffect(() => {
    GetData();
  }, [MyId]);

  const submission = async () => {

        AxiosInstance.delete( `project/${MyId}/`)
        .then((_res) =>{
          navigate(`/`)
        })
    
  };

  

  return (
    <div>
     
     { loading ? <p>Loading data...</p> :

     <div>

      <Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
         <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete project: {myData.name}
         </Typography>

      </Box>

      <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

          <Box sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}> 
              Are you sure that you want to delete this project: {myData.name}
          </Box>

          <Box sx={{width:'30%'}}>
                <Button variant="contained" onClick={submission} sx={{width:'100%'}}>
                   Delete the project
                </Button>
          </Box>

      </Box>
      </div> 
      
      }

    </div>
  )
}


export default Delete;
