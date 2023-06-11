import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import createEnvelope from "../utils/createEnvelope";
import {Envelope} from "../Interfaces/Envelope";
import updateEnvelope from "../utils/updateEnvelope";
import {EnvelopesContext} from "./Envelopes";

interface CreateEnvelopeModalProps {
    closeModal: Function;
    envelope: Envelope
}

const EnvelopeModal: React.FC<CreateEnvelopeModalProps> = (props) => {
    const {setEnvelopes} = React.useContext(EnvelopesContext);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [envelope, setEnvelope] = useState<Envelope>(props.envelope);

    const handleCloseModal =() => {
        props.closeModal();
    };

    const handleSubmitModal = async () => {
        setError("");
        setIsProcessing(true);
        let response;
        if (envelope.id) {
            response = await updateEnvelope(envelope);
        } else {
            response = await createEnvelope(envelope);
        }
        if (response && response >= 200 && response < 300) {
            setIsProcessing(false);
            handleCloseModal();
        } else {
            setIsProcessing(false);
            setError("Failed to create/update envelope :(")
        }
        setEnvelopes((oldEnvelopes: Envelope[]) => {
            const newEnvelopes = oldEnvelopes.filter((oldEnvelope) => oldEnvelope.id !== envelope.id);
            return [...newEnvelopes, envelope];
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setEnvelope({
            ...envelope,
            [e.target.name]: e.target.value
        });
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
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name of savings envelope"
                                    name="name"
                                    onChange={handleChange}
                                    defaultValue={envelope.name}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="new-envelope-amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter amount"
                                    name="amount"
                                    onChange={handleChange}
                                    defaultValue={envelope.amount}
                                />
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

export default EnvelopeModal;
