import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../App";
import toast from "react-hot-toast";

const EditMentor = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [name, setName] = useState("");
  let [batch, setBatch] = useState([]);
  let [email, setEmail] = useState("");
  let [newBatch, setNewBatch] = useState("");

  const getMentors = async () => {
    let res = await axios.get(`${API_URL}/mentor/${params.id}`);
    try {
      if (res.status === 200) {
        setName(res.data.mentor.name);
        setBatch(res.data.mentor.batch);
        setEmail(res.data.mentor.email);
      }
    } catch (error) {}
  };
  const handleAddBatchAndEdit = (callback) => {
    if (!newBatch.trim()) {
      toast.error("Select a valid Batch");
      return;
    }
    setBatch((prevBatch) => {
      const updatedBatch = [...prevBatch, newBatch.trim()];
      setNewBatch("");
      setTimeout(() => handleEdit(updatedBatch), 0);
      return updatedBatch;
    });
  };

  const handleEdit = async (updatedBatch) => {
    try {
      let data = { name, batch: updatedBatch || batch, email };
      let res = await axios.put(`${API_URL}/mentor/${params.id}`, data);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <>
      <div className="edit-form">
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
            <Button onClick={handleAddBatchAndEdit} variant="success">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditMentor;
