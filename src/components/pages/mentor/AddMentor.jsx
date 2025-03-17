import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../App";
import toast from "react-hot-toast";

const AddMentor = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState([]);
  let [mentor, setMentor] = useState("");
  let [newBatch, setNewBatch] = useState("");

  const handleAddMentor = async () => {
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
        let res = await axios.post(`${API_URL}/mentor`, data);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/");
        }
      }
    } catch (error) {}
  };
  const getMentor = async () => {
    let res = await axios.get(`${API_URL}/mentor`);
    setMentor(res.data.mentor);
    try {
      if (res.status === 200) {
      }
    } catch (error) {}
  };
  const handleAddBatch = () => {
    let newArray = [...batch];
    if (newBatch === "") {
    } else {
      let trim = newBatch.trim();
      newArray.push(trim);
    }
    setBatch(newArray);
    setNewBatch("");
  };

  useEffect(() => {
    getMentor();
  });
  return (
    <>
      <Form>
        <div className="formGroup">
          <Form.Group className="mb-3">
            <Form.Label>Name :</Form.Label>
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
            <Form.Label>Email :</Form.Label>
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
            <Form.Label>Add Batch:</Form.Label>
            <Form.Select
              className="select-student"
              onChange={(e) => {
                setNewBatch(e.target.value);
              }}
            >
              <option value="">Select Batch</option>
              <option>B53</option>
              <option>B54</option>
              <option>B55</option>
              <option>B56</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="buttonGroup">
          <Button onClick={() => navigate("/")} variant="outline-dark">
            Back
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={() => handleAddMentor()}
            onClickCapture={() => handleAddBatch()}
            variant="success"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddMentor;
