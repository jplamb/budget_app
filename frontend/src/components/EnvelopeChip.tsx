import React from 'react';
import {Envelope} from "../Interfaces/Envelope";

import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import {RiPencilFill} from "react-icons/ri";
import EnvelopeModal from "./EnvelopeModal";
import {BiTrash} from "react-icons/bi";
import DeleteModal from "./DeleteModal";
import deleteEnvelope from "../utils/deleteEnvelope";
import {EnvelopesContext} from "./Envelopes";


interface EnvelopeChipProps {
    envelope: Envelope;
}
const EnvelopeChip: React.FC<EnvelopeChipProps> = ({envelope}) => {
    const {setEnvelopes} = React.useContext(EnvelopesContext);
    const [toggleEnvelopeModal, setToggleEnvelopeModal] = React.useState<boolean>(false);
    const [toggleDeleteModal, setToggleDeleteModal] = React.useState<boolean>(false);

    return (
        <>
            <Card className="p-2" style={{ width: '18rem' }}>
                <Card.Title className="mb-2 p-2" style={{ fontSize: '2.5em' }}>{envelope.name}</Card.Title>
                <Row className="align-items-center justify-content-between pr-3">
                    <Col md={3} >
                        <Badge bg="secondary p-2 m-2 text-success" style={{ fontSize: '2em' }}>${envelope.amount}</Badge>
                    </Col>
                    <Col md={{span: 3, offset: 3}} className="justify-content-end">
                        <Button variant="primary" className="mb-2" onClick={() => setToggleEnvelopeModal(!toggleEnvelopeModal)}>
                            <RiPencilFill />
                        </Button>
                        <Button variant="danger" onClick={() => setToggleDeleteModal(!toggleDeleteModal)}>
                            <BiTrash />
                        </Button>
                    </Col>
                </Row>
            </Card>
            {toggleEnvelopeModal && (
                <EnvelopeModal closeModal={() => setToggleEnvelopeModal(!toggleEnvelopeModal)} envelope={envelope}/>
            )}
            {toggleDeleteModal && (
                <DeleteModal closeModal={() => setToggleDeleteModal(!toggleDeleteModal)} item={envelope} deleteItem={deleteEnvelope} updateItems={setEnvelopes} />
            )}
        </>
      );
};

export default EnvelopeChip;
