import React  from 'react';
import {Container, Row,} from "react-bootstrap";

import BonusDistributionCalculator from "./BonusDistributionCalculator";

const Calculators: React.FC = () => {
    return (
         <Container>
            <Row>
                <header>
                    <h1>Calculators</h1>
                </header>
            </Row>
            <Row md={3} className="mb-3 mt-3">
                <BonusDistributionCalculator />
            </Row>
        </Container>
    );
};

export default Calculators;
