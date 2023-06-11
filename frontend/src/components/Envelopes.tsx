import React, {useEffect, useState, createContext} from 'react';
import {Envelope} from "../Interfaces/Envelope";
import getEnvelopes from "../utils/getEnvelopes";
import {Button, Col, Container, Row} from "react-bootstrap";
import EnvelopeModal from "./EnvelopeModal";
import EnvelopeChip from "./EnvelopeChip";

interface EnvelopesContextType {
    envelopes: Envelope[];
    setEnvelopes: Function;
}
export const EnvelopesContext = createContext<EnvelopesContextType>({
    envelopes: [],
    setEnvelopes: () => {}
});


const Envelopes: React.FC = () => {
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
        <EnvelopesContext.Provider value={{envelopes, setEnvelopes}}>
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
                <EnvelopeModal closeModal={toggleEnvelopModal} envelope={{} as Envelope}/>
            )}
        </EnvelopesContext.Provider>
      );
};

export default Envelopes;
