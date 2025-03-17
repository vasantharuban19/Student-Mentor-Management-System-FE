import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import { FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const DashBoard = () => {
  let navigate = useNavigate();
  let [mentor, setMentor] = useState([]);
  // get mentors data
  const getMentors = async () => {
    let res = await axios.get(`${API_URL}/mentor`);
    try {
      if (res.status === 200) {
        setMentor(res.data.mentor);
        // console.log(mentor);
      }
    } catch (error) {}
  };
  //handleDelete Mentor
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${API_URL}/mentor/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        getMentors();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMentors();
  }, []);
  return (
    <>
      <div className="Table-container">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>S.No</th>
              <th>NAME</th>
              <th>E-MAIL ID</th>
              <th>BATCHES</th>
              <th>STUDENTS</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {mentor.map((e, i) => {
              return (
                <tr className="text-center" key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    <Form.Select size="" aria-label="Default select example">
                      {[...new Set(e.batch)].map((o, index) => (
                        <option value={o} key={index}>
                          {o}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      onClick={() => navigate(`/studentlist/${e._id}`)}
                      variant="outline-dark"
                    >
                      Check Students
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => navigate(`/editmentor/${e._id}`)}
                      variant="outline-dark"
                    >
                      <FaUserEdit />
                    </Button>{" "}
                    &nbsp;
                    <Button
                      onClick={() => handleDelete(e._id)}
                      variant="outline-danger"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DashBoard;
