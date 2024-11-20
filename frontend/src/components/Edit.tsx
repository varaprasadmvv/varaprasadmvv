
import {useEffect, useState} from 'react' 
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyDatePicker from './forms/MyDatePicker'
import MyMultilineFields from './forms/MyMultilineFields'
import MySelectFields from './forms/MySelectFields'
import dayjs from 'dayjs'

const Edit = () => {
  const MyParam = useParams()
  const MyId = MyParam.id


  const [projectmanager,setProjectmanager] = useState()
  //const [employees,setEmployees] = useState()
   const [employee, setEmployee] = useState<[]>([]);
  const [loading,setLoading] = useState(true)

  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]


  const GetData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) =>{
      setProjectmanager(res.data)
      console.log(res.data)

    })

    AxiosInstance.get(`/employees/`)
    .then((res: any) => {
      setEmployee(res.data);
      console.log(res.data)
      setLoading(false)
    })
    .catch((error: any) => {
      console.error('There was an error fetching the data!', error);
    });

    AxiosInstance.get(`project/${MyId}`).then((res) =>{
      console.log(res.data)
      setValue('name',res.data.name)
      setValue('status',res.data.status)
      setValue('employee',res.data.employees)
      setValue('projectmanager',res.data.projectmanager)
      setValue('comments',res.data.comments)
    //   setValue('start_date',Dayjs(res.data.start_date))
    //   setValue('end_date',Dayjs(res.data.end_date))
      setLoading(false)
    })

  }

  useEffect(() => {
    GetData();
  },[] )

  const navigate = useNavigate()
  const defaultValues = {
    name : '', 
    comments: '', 
    status: '', 
    projectmanager:'',
    employee:'',
    
  }

  const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})
  const submission = (data: any) => 
    {
      const StartDate = dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
      const EndDate = dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
      
      AxiosInstance.put( `project/${MyId}/`,{
        name: data.name,
        projectmanager: data.projectmanager,
        employees: data.employees,
        status: data.status,
        comments: data.comments, 
        start_date: StartDate, 
        end_date: EndDate,

      })

      .then((res) =>{
        navigate(`/`)
      })


    }
  
  return (
    <div>
      { loading ? <p>Loading data...</p> :
      <form onSubmit={handleSubmit(submission)}>

      <Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
         <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Eiditing records
         </Typography>

      </Box>

      <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

          <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}> 
              <MyTextFields
                label="Name"
                name={"name"}
                control={control}
                placeholder="Provide a project name"
                width={'30%'}
              />

              <MyDatePicker
                label="Start date"
                name="start_date"
                control={control}
                width={'30%'}
              />

              <MyDatePicker
                label="End date"
                name="end_date"
                control={control}
                width={'30%'}
              />

          </Box>

          <Box sx={{display:'flex', justifyContent:'space-around'}}> 
              <MyMultilineFields
                              label="Comments"
                              name="comments"
                              control={control}
                              placeholder="Provide project comments"
                              width={'30%'} rows={0}              />

              <MySelectFields
                label="Status"
                name="status"
                control={control}
                width={'30%'}
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

         <Box sx={{display:'flex', justifyContent:'space-around', marginTop: '40px'}}> 

              <MySelectFields
                  label="Employees"
                  name="employees"
                  control={control}
                  width={'30%'}
                  options = {employee}
              />

          </Box>

          <Box>
          <Box sx={{display:'flex', justifyContent:'space-around', marginTop:'40px'}}> 
                <Button variant="contained" type="submit" sx={{width:'30%', color:'black'}}>
                   Submit
                </Button>
          </Box>
          </Box>

          
      </Box>

      </form>
    }
    </div>
  )
}

export default Edit