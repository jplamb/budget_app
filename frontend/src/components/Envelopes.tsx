import React, {useEffect, useState} from 'react';
import {Envelope} from "../Interfaces/Envelope";
import getEnvelopes from "../utils/getEnvelopes";
import {Button, Col, Container, Row} from "react-bootstrap";
import CreateEnvelopeModal from "./CreateEnvelopeModal";
import EnvelopeChip from "./EnvelopeChip";


interface EnvelopesProps {

}
const Envelopes: React.FC<EnvelopesProps> = (props) => {
    const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
    const [isCreateEnvelopeVisible, setCreateEnvelopModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const response = await getEnvelopes();
            setEnvelopes(response);
        }
        getData();
    }, [isCreateEnvelopeVisible])

    const toggleEnvelopModal = () => {
        setCreateEnvelopModalVisible(!isCreateEnvelopeVisible);
    }


    return (
        <>
            <Container>
                <Row>
                    <header>
                        <h1>Savings Envelopes</h1>
                    </header>
                </Row>
                <Row sm={3} className="mb-3 mt-3">
                    <Button
                        onClick={() => toggleEnvelopModal()}
                        variant="primary">
                        Add Envelope
                    </Button>
                </Row>
                <Row>
                    {envelopes.map((envelope) => (
                        <Col md={4} key={envelope.id} className="mb-4 mt-4 p-2">
                            <EnvelopeChip envelope={envelope} />
                        </Col>
                    ))}
                </Row>
            </Container>
            {isCreateEnvelopeVisible && (
                <CreateEnvelopeModal closeModal={toggleEnvelopModal}/>
            )}
        </>
      );
};

export default Envelopes;
