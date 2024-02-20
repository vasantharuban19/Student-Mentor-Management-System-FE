import React from "react";
import TopBar from "../common/TopBar";
import DashBoard from "../pages/DashBoard";
import AllStudent from "../pages/student/AllStudent";
import StudentList from "../pages/student/StudentList";
import EditMentor from "../pages/mentor/EditMentor";
import AddStudent from "../pages/student/AddStudent";
import AddMentor from "../pages/mentor/AddMentor";
import EditStudent from "../pages/student/EditStudent";

const AppRoutes =[
    {
        path:"/",
        exact:true,
        element:<><TopBar/><DashBoard/></>
    },
    {
        path:"/allstudent",
        exact:true,
        element:<><TopBar/><AllStudent/></>
    },
    {
        path:"/studentlist/:id",
        exact:true,
        element:<><TopBar/><StudentList/></>
    },
    {
        path:"/editmentor/:id",
        exact:true,
        element:<><TopBar/><EditMentor/></>
    },
    {
        path:"/addmentor",
        exact:true,
        element:<><TopBar/><AddMentor/></>
    },
    {
        path:"/addstudent",
        exact:true,
        element:<><TopBar/><AddStudent/></>
    },
    {
        path:"/editstudent/:id",
        exact:true,
        element:<><TopBar/><EditStudent/></>
    }
]

export default AppRoutes