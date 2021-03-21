import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  var [validated, setValidated]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else{
    history.push("/prodaja");
    event.preventDefault();
    }
  }

  return (
    <div className="Login">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email"  onChange={(e) => setEmail(e.target.value)} />
          <Form.Control.Feedback type="invalid">Neispravan format email-a</Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button block variant="secondary" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
