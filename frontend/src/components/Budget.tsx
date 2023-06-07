import React, {useEffect, useState} from 'react';
import {BudgetCategories, MonthConfig} from "../utils/config";
import BudgetRow from "./BudgetRow";
import { Container, Row, Table} from "react-bootstrap";
import getTransactionsForMonth from "../utils/getTransactionsForMonth";
import {Transaction} from "../Interfaces/Transaction";
import MonthSelector from "./MonthSelector";
import Transactions from "./Transactions";

const Budget: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categorySums, setCategorySums] = useState<{[category: string]: number}>({});
    const [txChanged, setTXChanged] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

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


    return (
        <Container className="Budget">
            <Row>
                <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            </Row>
            <Row xs={2} md={4} lg={6}>
                <Table className="BudgetTable table table-striped" size="sm" style={{ maxWidth: "500px"}}>
                    <thead>
                        <tr className="table-success">
                            <th>
                                Category
                            </th>
                            <th className="text-center">
                                Budgeted
                            </th>
                            <th className="text-center">
                                Actual
                            </th>
                            <th className="text-center">
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
            </Row>

            <Transactions transactions={transactions} txChanged={txChanged} setTXChanged={setTXChanged} />
        </Container>
    );
};

export default Budget;
