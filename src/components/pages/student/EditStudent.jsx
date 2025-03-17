import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../App";
import toast from "react-hot-toast";

const EditStudent = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [allmentor, setAllMentor] = useState([]);
  let [allBatch, setAllBatch] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState("");
  let [mentor, setMentor] = useState("");
  const handleAddStudent = async () => {
    try {
      let data = { name, batch, email, mentor };
      if (
        data.name === "" ||
        data.batch === "" ||
        data.email === "" ||
        data.mentor === ""
      ) {
        toast.error("Fill All Fields");
      } else {
        let res = await axios.put(`${API_URL}/student/${params.id}`, data);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/allstudent");
        }
      }
    } catch (error) {}
  };
  const getStudent = async () => {
    try {
      let res = await axios.get(`${API_URL}/student/${params.id}`);
      if (res.status === 200) {
        setName(res.data.student.name);
        setEmail(res.data.student.email);
        setBatch(res.data.student.batch);
        setMentor(res.data.student.mentor?._id || "");
        if (res.data.student.mentor?._id) {
          mentorBatch(res.data.student.mentor._id);
        }
      }
    } catch (error) {}
  };
  const getMentor = async () => {
    let res = await axios.get(`${API_URL}/mentor`);
    console.log(res.data.mentor);
    setAllMentor(res.data.mentor);
    try {
      if (res.status === 200) {
      }
    } catch (error) {}
  };
  const mentorBatch = async (id) => {
    if (!id) {
      setAllBatch([]);
      setBatch("");
      return;
    }

    try {
      let res = await axios.get(`${API_URL}/mentor/${id}`);
      if (res.status === 200 && res.data.mentor.batch) {
        const uniqueBatches = [...new Set(res.data.mentor.batch)];
        setAllBatch(uniqueBatches);
        setBatch("");
      }
    } catch (error) {
      console.error("Error fetching mentor batch:", error);
    }

    setMentor(id);
  };
  useEffect(() => {
    getMentor(), getStudent();
  }, []);

  return (
    <>
      <Form>
        <div className="formGroup">
          <Form.Group className="mb-3">
            <Form.Label>
              <b>NAME :</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>E-MAIL ID :</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>MENTOR :</b>
            </Form.Label>
            <Form.Select
              className="select-student"
              onChange={(e) => {
                mentorBatch(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="">Select Mentor</option>
              {allmentor.map((e, i) => (
                <option key={i} value={e._id}>
                  {e.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>BATCH :</b>
            </Form.Label>
            <Form.Select
              className="select-student"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              aria-label="Default select example"
            >
              <option value="">Select Batch</option>
              {allBatch.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="buttonGroup">
          <Button onClick={() => navigate("/")} variant="outline-dark">
            Back
          </Button>
          &nbsp; &nbsp;
          <Button onClick={() => handleAddStudent()} variant="success">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditStudent;
