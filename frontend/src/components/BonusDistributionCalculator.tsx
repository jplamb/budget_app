import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table,} from "react-bootstrap";


const BonusDistributionCalculator: React.FC = () => {
    const [calcState, setCalcState] = useState({
        'amount': 1,
        'tithePercent': 15,
        'savingsPercent': 15,
        'vacationPercent': 40
    });
    const [remainingPercent, setRemainingPercent] = useState(0);
    const calcAmount = (percent: number, amount: number) => {
        return percent / 100 * amount;
    };
    const [categoryAmounts, setCategoryAmounts] = useState({
        'tithe': 0,
        'savings': 0,
        'vacation': 0,
        'remaining': 0
    });

    useEffect(() => {
        const titheAmount = calcAmount(calcState.tithePercent, calcState.amount);
        const savingsAmount = calcAmount(calcState.savingsPercent, calcState.amount);
        const vacationAmount = calcAmount(calcState.vacationPercent, calcState.amount);
        const remaining = +(calcState.amount - titheAmount - savingsAmount - vacationAmount).toFixed(2);
        setCategoryAmounts({
            'tithe': titheAmount,
            'savings': savingsAmount,
            'vacation': vacationAmount,
            remaining,
        });
    }, [calcState]);

    useEffect(() => {
        setRemainingPercent(Math.round(100 - calcState.tithePercent - calcState.savingsPercent - calcState.vacationPercent));
    }, [calcState.tithePercent, calcState.savingsPercent, calcState.vacationPercent]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCalcState({
            ...calcState,
            [event.target.name]: event.target.value
        });
    };

    return (
         <Container>
             <Row>
                 <h3>Bonus Distribution Calculator</h3>
             </Row>
             <Row>
                 <Table size="sm" className="table">
                     <thead>
                         <tr>
                             <th>#</th>
                             <th></th>
                             <th>Percent</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <th>Amount</th>
                             <th>
                                 <input
                                     className="text-center"
                                     type="number"
                                     name="amount"
                                     value={calcState.amount}
                                     onChange={handleChange}
                                 />
                             </th>
                             <th className="text-center">100%</th>
                         </tr>
                         <tr>
                             <td>Tithe</td>
                             <td className="text-center">${categoryAmounts.tithe}</td>
                             <td>
                                 <input
                                     className="text-center"
                                     type="number"
                                     name="tithePercent"
                                     value={calcState.tithePercent}
                                     onChange={handleChange}
                                 />
                             </td>
                         </tr>
                         <tr>
                             <td>Savings</td>
                             <td className="text-center">${categoryAmounts.savings}</td>
                             <td>
                                 <input
                                     className="text-center"
                                     type="number"
                                     name="savingsPercent"
                                     value={calcState.savingsPercent}
                                     onChange={handleChange}
                                 />
                             </td>
                         </tr>
                         <tr>
                             <td>Vacation</td>
                             <td className="text-center">${categoryAmounts.vacation}</td>
                             <td>
                                 <input
                                     className="text-center"
                                     type="number"
                                     name="vacationPercent"
                                     value={calcState.vacationPercent}
                                     onChange={handleChange}
                                 />
                             </td>
                         </tr>
                         <tr>
                             <th>Remaining</th>
                             <th className="text-center">${categoryAmounts.remaining}</th>
                             <th className="text-center">{remainingPercent}%</th>
                         </tr>
                     </tbody>
                 </Table>
             </Row>
        </Container>
    );
};

export default BonusDistributionCalculator;
