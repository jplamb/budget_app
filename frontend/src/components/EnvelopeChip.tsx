import React from 'react';
import {Envelope} from "../Interfaces/Envelope";

import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import {RiPencilFill} from "react-icons/ri";


interface EnvelopeChipProps {
    envelope: Envelope;
}
const EnvelopeChip: React.FC<EnvelopeChipProps> = ({envelope}) => {
    const updateEnvelope = () => {
        console.log("update envelope");
    }

    return (
        <Card className="p-2" style={{ width: '18rem' }}>
            <Card.Title className="mb-2 p-2" style={{ fontSize: '2.5em' }}>{envelope.name}</Card.Title>
            <Row className="align-items-center justify-content-between pr-3">
                <Col md={3} >
                    <Badge bg="secondary p-2 m-2 text-success" style={{ fontSize: '2em' }}>${envelope.amount}</Badge>
                </Col>
                <Col md={{span: 3, offset: 3}} className="justify-content-end">
                    <Button variant="primary" onClick={updateEnvelope}>
                        <RiPencilFill />
                    </Button>
                </Col>
            </Row>
        </Card>
      );
};

export default EnvelopeChip;
