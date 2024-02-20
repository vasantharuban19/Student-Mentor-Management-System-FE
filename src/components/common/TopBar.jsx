import React from 'react'
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import {FaUsers,FaUserPlus} from 'react-icons/fa'

const TopBar = ()=> {
  let location = useLocation()
  let active = 'activeNav'
  let navigate = useNavigate()

  return (
    <>
     <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=> navigate('/')} >Zen Class</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link className={`${location.pathname === '/'? "navItem" : ""}`} onClick={()=>navigate("/")}>
              <RxDashboard className={`navIcon ${location.pathname === '/'? active : ""}`} />
              <span className="ms-2">Dashboard</span>
            </Nav.Link>
            <Nav.Link className={`${location.pathname === '/allstudent'? "navItem" : ""}`} onClick={()=>navigate("/allstudent")}>
              <FaUsers className={`navIcon ${location.pathname === '/allstudent'? active : ""}`} />
              <span className="ms-2">All Student</span>
            </Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link className={`${location.pathname === '/addmentor'? "navItem" : ""}`} onClick={()=>navigate("/addmentor")}>
              <FaUserPlus className={`navIcon ${location.pathname === '/addmentor'? active : ""}`} />
              <span className="ms-2">Add Mentor</span>
            </Nav.Link>
            <Nav.Link className={`${location.pathname === '/addstudent'? "navItem" : ""}`} onClick={()=>navigate("/addstudent")}>
              <FaUserPlus className={`navIcon ${location.pathname === '/addstudent'? active : ""}`} />
              <span className="ms-2">Add Student</span>
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}

export default TopBar