import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import createEnvelope from "../utils/createEnvelope";
import {NewEnvelope} from "../Interfaces/Envelope";

interface CreateEnvelopeModalProps {
    closeModal: Function;

}
const CreateEnvelopeModal: React.FC<CreateEnvelopeModalProps> = (props) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [newEnvelope, setNewEnvelope] = useState<NewEnvelope>({name: "", amount: 0});

    const handleCloseModal =() => {
        props.closeModal();
    };

    const handleSubmitModal = async () => {
        setError("");
        setIsProcessing(true);
        const response = await createEnvelope(newEnvelope);
        if (response && response >= 200 && response < 300) {
            setIsProcessing(false);
            handleCloseModal();
        } else {
            setIsProcessing(false);
            setError("Failed to create envelope :(")
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setNewEnvelope({
            ...newEnvelope,
            [e.target.name]: e.target.value
        });
          console.log(newEnvelope)
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
            <Form onSubmit={handleSubmitModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new savings envelope</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!isProcessing ? (
                        <>
                            <Form.Group className="mb-3" controlId="new-envelope-name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name of savings envelope" name="name" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="new-envelope-amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter amount" name="amount" onChange={handleChange} />
                            </Form.Group>
                        </>
                    ) : (
                        <p>Processing...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleCloseModal()} variant="secondary">Close</Button>
                    <Button onClick={() => handleSubmitModal()} variant="primary">Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
      );
};

export default CreateEnvelopeModal;
