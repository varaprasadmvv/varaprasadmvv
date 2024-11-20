import { Box, Button, Typography } from "@mui/material";
import MyDatePicker from "./forms/MyDatePicker";
import MyMultilineFields from "./forms/MyMultilineFields";
import { useForm } from "react-hook-form";
import MyTextFields from "./forms/MyTextFields";
import MySelectFields from "./forms/MySelectFields";
import AxiosInstance from "./Axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useState } from "react";
import MyMultiSelectField from "./forms/MyMultiSelectFields";

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
  options:any;
};


const Create = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    comments: "",
    status: "",
    start_date: null,
    end_date: null,
    
  };
  const schema = yup.object({
    name: yup.string().required('project name required'),
    projectmanager: yup.string().required('project manager selection'),
    status: yup.string().required('staus is compulsary'),
    employees: yup.array().min(1,'pick at least one option from the field'),
    comments: yup.string().required('comments are options'),
    start_date: yup.date().required('Start date is required field'),
    end_date: yup.date().required('End date is required field').min(yup.ref('start_date'),'the end date con not be before the start date'),

  })
  
  const [projectmanager, setPorjectManager] = useState<Project[]>([]);
  const [employee, setEmployee] = useState<Project[]>([]);
  const [loading, setLoading ] = useState(true);

  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]

const GetData = () => {
    AxiosInstance.get(`/projectmanager/`)
      .then((res: any) => {
        setPorjectManager(res.data);
        console.log(res.data)
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('There was an error fetching the data!', error);
      });
      AxiosInstance.get(`/employees/`)
      .then((res: any) => {
        setEmployee(res.data);
        console.log(res.data)
        setLoading(false)
      })
      .catch((error: any) => {
        console.error('There was an error fetching the data!', error);
      });
      
  };

  useEffect(() => {
    GetData();
  }, []);
  



  const { handleSubmit, reset, setValue, control } = useForm({
    defaultValues: defaultValues, resolver: yupResolver(schema)
  });

  const submission = (data: any) => {
    console.log(data);
    const StartDate = dayjs(data.start_date).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date).format("YYYY-MM-DD");
    console.log('submission',data)
    AxiosInstance.post(`/project/`, {
      name: data.name,
      projectmanager:data.projectmanager,
      employees: data.empleyees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then((_res) => {
        navigate('/');
      })
  };
    

  return (
    <div>
      { loading ? <p>Loading data...</p> :
    <form onSubmit={handleSubmit(submission)}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "#00003f",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{ marginLeft: "10px", color: "#fff", marginBottom: "30px" }}
        >
          Create Records
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          boxShadow: 3,
          padding: 4,
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <MyTextFields
            label="Name"
            name="name"
            control={control}
            placeholder="Provide a project name"
            width={"30%"}
          />
          <MyDatePicker
            label="Start date"
            name="start_date"
            width={"30%"}
            control={control}
          />
          <MyDatePicker
            label="End date"
            name="end_date"
            width={"30%"}
            control={control}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <MyMultilineFields
            label="comments"
            name="comments"
            control={control}
            placeholder="Provide project comments"
            width={"30%"}
            rows={3}
          />
          <MySelectFields
            label="Status"
            name="status"
            width={"30%"}
            control={control}
            placeholder={"Status"}
            options={hardcoded_options}
          />
           <MySelectFields
                label="Project manager"
                name="projectmanager"
                control={control}
                width={'30%'}
                options = {projectmanager}
              />
          
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>

          <MyMultiSelectField 
          control={control} 
          name="Employees"
           label="employee" 
          width={"30%"} 
          options={employee}/>
        </Box>
        <Box sx={{ width: "30%", marginTop: "20px" }}>
            <Button
              type="submit"
              sx={{ width: "100%", backgroundColor: "blue", color: "white" }}
            >
              Submit
            </Button>
          </Box>
      </Box>
    </form>
}
    </div>
  );
};

export default Create;
