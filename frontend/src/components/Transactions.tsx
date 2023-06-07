import React, { useState } from 'react';
import {Button, Container, Row, } from "react-bootstrap";
import TransactionList from "./TransactionList";
import updateTransactionBudgetMonth from "../utils/updateTransactionBudgetMonth";
import updateTransactionCategory from "../utils/updateTransactionCategory";
import processTransactions from "../utils/processTransactions";
import {Transaction} from "../Interfaces/Transaction";


interface TransactionsProps {
    transactions: Transaction[];
    txChanged: boolean;
    setTXChanged: Function;
}
const Transactions: React.FC<TransactionsProps> = (props) => {
    const [isProcessingTransactions, setIsProcessingTransactions] = useState<boolean>(false);
    const [areTransactionsVisible, setAreTransactionsVisible] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateTransactionMonth = (txId: string, newBudgetMonth: string) => {
        setIsUpdating(true);
        updateTransactionBudgetMonth(txId, newBudgetMonth).then(() => {
            props.setTXChanged(!props.txChanged);
        }).finally(() => setIsUpdating(false));
    };

     const updateCategory = (txId: string, newCategory: string) => {
        setIsUpdating(true);
        updateTransactionCategory(txId, newCategory).then(() => {
            props.setTXChanged(!props.txChanged);
        }).finally(() => setIsUpdating(false));
    };

     const updateTransactions = () => {
        setIsProcessingTransactions(true);
        processTransactions().then((data) => {
           props.setTXChanged(!props.txChanged);
        }).finally(() => {
           setIsProcessingTransactions(false);
        });
    };


    return (
        <>
            <Container className="options" style={{ display: 'flex', 'flexDirection': 'row'}}>
                <Row className='processTransactionsOptions' style={{ marginRight: '1rem' }}>
                    <Button
                        style={{marginBottom: '1rem', }}
                        size={'sm'}
                        variant="secondary"
                        onClick={() => updateTransactions()}
                        disabled={isProcessingTransactions}
                    >
                        {isProcessingTransactions ? 'Loading...' : 'Process Transactions'}
                    </Button>
                    <Button style={{marginBottom: '1rem'}} size={'sm'} variant="secondary" onClick={() => setAreTransactionsVisible(!areTransactionsVisible)}>Show/Hide Transactions</Button>
                </Row>
            </Container>

            {areTransactionsVisible && !isUpdating && (
                <TransactionList transactions={props.transactions} updateCategory={updateCategory} updateBudgetMonth={updateTransactionMonth} />
            )}
        </>
    );
};

export default Transactions;
