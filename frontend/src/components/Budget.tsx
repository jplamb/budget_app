import React, {useEffect, useState} from 'react';
import {BudgetCategories, MonthConfig} from "../utils/config";
import BudgetRow from "./BudgetRow";
import {Button, Dropdown, DropdownButton, Table} from "react-bootstrap";
import getTransactionsForMonth from "../utils/getTransactionsForMonth";
import {Transaction} from "../Interfaces/Transaction";
import TransactionList from "./TransactionList";
import processTransactions from "../utils/processTransactions";
import updateTransactionCategory from "../utils/updateTransactionCategory";
import updateTransactionBudgetMonth from "../utils/updateTransactionBudgetMonth";

const Budget: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [areTransactionsVisible, setAreTransactionsVisible] = useState<boolean>(false);
    const [categorySums, setCategorySums] = useState<{[category: string]: number}>({});
    const [txChanged, setTXChanged] = useState<boolean>(false);
    const [isProcessingTransactions, setIsProcessingTransactions] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const updateCategory = (txId: string, newCategory: string) => {
        setIsUpdating(true);
        updateTransactionCategory(txId, newCategory).then(() => {
            setTXChanged(!txChanged);
        }).finally(() => setIsUpdating(false));
    };
    const updateTransactionMonth = (txId: string, newBudgetMonth: string) => {
        setIsUpdating(true);
        updateTransactionBudgetMonth(txId, newBudgetMonth).then(() => {
            setTXChanged(!txChanged);
        }).finally(() => setIsUpdating(false));
    };

    useEffect( () => {
        getTransactionsForMonth(MonthConfig[selectedMonth].month).then((data) => {
            setTransactions(data);
        });

    }, [txChanged, selectedMonth]);

    useEffect(() => {
        console.log(transactions)
        const sumTransactions = () => {
            const sums = transactions.reduce((acc, tx) => {
                const {category, amount} = tx;
                // @ts-ignore
                acc[category] = (acc[category] || 0) + amount;
                return acc;
            }, {});
            setCategorySums(sums);
        };
        sumTransactions();
    }, [txChanged, transactions]);

    const updateTransactions = () => {
        setIsProcessingTransactions(true);
        processTransactions().then((data) => {
           setTXChanged(!txChanged);
        }).finally(() => {
           setIsProcessingTransactions(false);
        });
    };

    return (
        <div className="Budget">
            <p>Selected Month: {MonthConfig[selectedMonth].month}</p>
            <DropdownButton title="Select Month" variant="secondary" id="dropdown-basic-button" defaultValue={MonthConfig[selectedMonth].month}>
                {MonthConfig.map((monthObj, iter) => (
                    <Dropdown.Item key={`${monthObj.month}-${iter}`} onClick={() => setSelectedMonth(monthObj.monthNumber)}>{monthObj.month}</Dropdown.Item>
                ))}
            </DropdownButton>
            <Table className="BudgetTable table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>
                            Category
                        </th>
                        <th>
                            Budgeted Amount
                        </th>
                        <th>
                            Actual Amount
                        </th>
                        <th>
                            Difference
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(BudgetCategories).map((category, iter) => (
                        <BudgetRow
                            categoryName={category.name}
                            categoryBudget={category.budgetedAmount}
                            categoryActual={-1 * categorySums[category.name] || 0}
                            isTableHeader={['Other', 'Income'].includes(category.name)}
                            key={`${category}-${iter}`}
                        />
                    ))}
                </tbody>
            </Table>
            <div className="options" style={{ display: 'flex', 'flexDirection': 'row'}}>
                <div className='processTransactionsOptions' style={{ marginRight: '1rem' }}>
                    <Button
                        style={{marginBottom: '1rem', }}
                        size={'sm'}
                        variant="secondary"
                        onClick={() => updateTransactions()}
                        disabled={isProcessingTransactions}
                    >
                        {isProcessingTransactions ? 'Loading...' : 'Process Transactions'}
                    </Button>
                </div>
                <div className="showTransactionsOptions">
                    <Button style={{marginBottom: '1rem'}} size={'sm'} variant="secondary" onClick={() => setAreTransactionsVisible(!areTransactionsVisible)}>Show/Hide Transactions</Button>
                </div>
            </div>
            {areTransactionsVisible && !isUpdating && (
                <TransactionList transactions={transactions} updateCategory={updateCategory} updateBudgetMonth={updateTransactionMonth} />
            )}
        </div>
    );
};

export default Budget;
