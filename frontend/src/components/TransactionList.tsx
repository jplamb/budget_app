import React, {useEffect} from 'react';
import {Transaction} from "../Interfaces/Transaction";
import {Table} from "react-bootstrap";
import TransactionRow from "./TransactionRow";


interface TransactionListProps {
    transactions: Transaction[];
    updateCategory: Function;
    updateBudgetMonth: Function;
}
const TransactionList: React.FC<TransactionListProps> = ({transactions, updateCategory, updateBudgetMonth}) => {
    const [sortedTransactions, setSortedTransactions] = React.useState<Transaction[]>();

    useEffect(() => {
        const sorted = transactions.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        });
        setSortedTransactions(sorted);
    }, [transactions.length])

    return (
        <Table className='TransactionList'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
            {sortedTransactions && sortedTransactions.length ? (
                <tbody>
                    {sortedTransactions.map((tx, iter) => (
                        <TransactionRow transaction={tx} key={`tx-${tx.category} ${tx.id}`} updateCategory={updateCategory} updateBudgetMonth={updateBudgetMonth} />
                    ))}
                </tbody>
            ) : (
                <div>No transactions found</div>
            )
            }
        </Table>
    );
};

export default TransactionList;
