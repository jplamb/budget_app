import React from 'react';
import {Transaction} from "../Interfaces/Transaction";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import {BudgetCategories, MonthConfig} from "../utils/config";
import {RiPencilFill} from "react-icons/ri"; // https://react-icons.github.io/react-icons/

interface TransactionRowProps {
    transaction: Transaction;
    updateCategory: Function;
    updateBudgetMonth: Function;
}

const DateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
}
const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, updateCategory, updateBudgetMonth}) => {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const formattedAmount = transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `$${transaction.amount}`;
    const transactionCategories = [...Object.keys(BudgetCategories), "Excluded"];

    return (
        <tr className="transactionRow">
            <th className="transactionDate">
                {isEditing ? (
                    <DropdownButton
                        variant='primary'
                        title='Select Month'
                        onSelect={(eventKey) => {
                            if (!eventKey) return;
                            updateBudgetMonth(transaction.id, eventKey);
                            transaction.budgetMonth = eventKey;
                            setIsEditing(false);
                        }}
                      >
                        {MonthConfig.map(monthObj => (
                            <Dropdown.Item eventKey={monthObj.month} key={`category-${monthObj.monthNumber}`}>{monthObj.month}</Dropdown.Item>
                        ))}
                      </DropdownButton>
                ) : (
                    transaction.date.toLocaleDateString('en-US', DateOptions)
                )}
            </th>
            <td className="transactionDescription">
                {transaction.payee}
            </td>
            <td className="transactionAmount">
                {formattedAmount}
            </td>
            <td className="transactionCategory">

                {isEditing ? (
                    <DropdownButton
                        variant='primary'
                        title='Select Category'
                        onSelect={(eventKey) => {
                            if (!eventKey) return;
                            updateCategory(transaction.id, eventKey);
                            transaction.category = eventKey;
                            setIsEditing(false);
                        }}
                      >
                        {transactionCategories.map((category, iter) => (
                            <Dropdown.Item eventKey={category} key={`category-${iter}`}>{category}</Dropdown.Item>
                        ))}
                      </DropdownButton>
                ) : transaction.category}
            </td>
            <td>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="primary"
                    size={'sm'}
                >
                    {isEditing ? 'Cancel' : <RiPencilFill />}
                </Button>
            </td>
        </tr>
    );
};

export default TransactionRow;
