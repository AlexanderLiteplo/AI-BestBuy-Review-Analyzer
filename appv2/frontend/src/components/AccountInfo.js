import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '../styles/layout.css'
import '../styles/search.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import axios from "../api/axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import useLogout from '../hooks/useLogout';

const AccountInfo = (props) => {
    const AccountInfo = props.info;
    const [showAlert, setShowAlert] = useState(false);
    const updateUser = async () => {
        var result = await axios.post('/edit', {
            username: AccountInfo.username,
            password: AccountInfo.password,
            postalCode: AccountInfo.postalCode,
            address: AccountInfo.address,
            city: AccountInfo.city,
            country: AccountInfo.country
        })
        console.log(result.status);
        if (result.status === 200) {
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            setShowAlert(true);
        }
    }


    return (
        <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Account Info : <strong>{AccountInfo.username}</strong> (#{AccountInfo.logInId})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={AccountInfo.username} disabled={true}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Change Password" defaultValue={AccountInfo.password} onChange={(e) => {AccountInfo.password = e.target.value}}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Change Address" defaultValue = {AccountInfo.address} onChange={(e) => {AccountInfo.address = e.target.value}}/>
      </Form.Group>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Change City" defaultValue = {AccountInfo.city} onChange={(e) => {AccountInfo.city = e.target.value}}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" placeholder="Change Zip Code" defaultValue = {AccountInfo.postalCode || ""} onChange={(e) => {AccountInfo.postalCode = e.target.value}}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Change Country" defaultValue = {AccountInfo.country} onChange={(e) => {AccountInfo.country = e.target.value}}/>
        </Form.Group>
      </Row>

          </Form>
      </Modal.Body>
      <Modal.Footer>
      {showAlert?<Alert key='success' variant='success'> Update Successful </Alert>:null}
      <Button onClick={updateUser}>Update User</Button>
      </Modal.Footer>
    </Modal>
    );
}

const AccountDel = (props) => {
    const logout = useLogout();
    const AccountInfo = props.info;

    const DelUser = async () => {
        var result = await axios.get('/edit/delete', {
            params: {
                username: AccountInfo.username
            }
        })
        console.log(result.status);
        if (result.status === 200) {
            props.onHide();
            logout();
        }
    }

    return (
        <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Account Info : <strong>{AccountInfo.username}</strong> (#{AccountInfo.logInId})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this user?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={DelUser}>Delete User</Button>
      <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}

export {AccountInfo, AccountDel};