import React,{useState,useEffect} from 'react'
import { Table } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate,useParams} from 'react-router-dom'
import { API_URL } from '../../../App'
import { FaUserEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"


const StudentList = ()=> {
let params = useParams()
let navigate = useNavigate()
let id = params.id
let [student,setStudent] = useState([])

const findIndex = (array,id)=>{
  for(let i = 0;i<array.length;i++){
    if(array[i]._id===id){
      return i 
    }
  }
}

// get studentslist data
const getStudents = async ()=>{
  let res = await axios.get(`${API_URL}/mentor/student/${id}`)
  try{
    if(res.status===200){
      setStudent(res.data.students)
    }
  }
  catch(error){

  }
}
 // delete students data
 const handleDelete = async(id,batch)=>{
  if(confirm('Click "OK" to delete the Student')){
    try{
      const index = findIndex(student,id)
      let newArray = [...student]
      newArray.splice(index,1)
      setStudent(newArray)
      let res = await axios.delete(`${API_URL}/student/${id}`)
      if(res.status===200){
        getStudents()
      }
    }
    catch(error){
    }
  }
}
useEffect(()=>{
  getStudents()
},[])

  return (
    <>
    <div className="Table-container">
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>S.NO</th>
            <th>NAME</th>
            <th>E-MAIL ID</th>
            <th>BATCH</th>
            <th>EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {student.map((e, i) => {
            return (
              <tr className="text-center" key={e._id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.batch}</td>
                <td>
                  <Button onClick={() => navigate(`/editstudent/${e._id}`)} variant="outline-dark">
                  <FaUserEdit/>
                  </Button>{" "}
                  &nbsp;
                  <Button onClick={() => handleDelete(e._id, e.batch)} variant="outline-danger">
                  <FaTrash/>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    </>
    )
}

export default StudentList