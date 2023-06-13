import React, {createContext, useEffect, useState} from 'react';
import BudgetRow from "./BudgetRow";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import getTransactionsForMonth from "../utils/getTransactionsForMonth";
import {Transaction} from "../Interfaces/Transaction";
import MonthSelector from "./MonthSelector";
import Transactions from "./Transactions";
import {Category} from "../Interfaces/Category";
import getCategoriesForMonth from "../utils/getCategoriesForMonth";
import CategoryModal from "./CategoryModal";
import CopyLastMonthsCategoriesModal from "./CopyLastMonthsCategoriesModal";

interface CategoriesContextType {
    categories: Category[];
    setCategories: Function;
}
export const CategoriesContext = createContext<CategoriesContextType>({
    categories: [],
    setCategories: () => {}
});

interface BudgetProps {
    isEditable?: boolean;
}

const Budget: React.FC<BudgetProps> = ({isEditable}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categorySums, setCategorySums] = useState<{[category: string]: number}>({});
    const [txChanged, setTXChanged] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<any>({month: new Date().getMonth(), year: new Date().getFullYear()});
    const [categories, setCategories] = useState<Category[]>([]);
    const [showNewCategoryModal, toggleNewCategoryModal] = useState<boolean>(false);
    const [showCopyLastMonthsCategories, toggleShowCopyLastMonthsCategories] = useState<boolean>(false);

    useEffect(() => {
        getCategoriesForMonth(Number(selectedDate.month) + 1, selectedDate.year).then((data) => {
            setCategories(data);
        });
    }, [selectedDate.month, selectedDate.year, showCopyLastMonthsCategories])

    useEffect( () => {
        if (isEditable) return;
        getTransactionsForMonth(Number(selectedDate.month) + 1, selectedDate.year).then((data) => {
            setTransactions(data);
        });

    }, [txChanged, selectedDate.month, selectedDate.year]);

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
        <CategoriesContext.Provider value={{categories, setCategories}}>
            <Container className="Budget">
                <Row>
                    <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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
                            {categories.map((category, iter) => (
                                <BudgetRow
                                    category={category}
                                    categoryActual={-1 * categorySums[category.name] || 0}
                                    isTableHeader={['Other', 'Income'].includes(category.name)}
                                    key={`${category}-${iter}`}
                                    isEditable={isEditable}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Row>

                {isEditable ? (
                    <>
                        <Row className="">
                            <Col className="pr-2">
                                <Button
                                    variant="primary"
                                    style={{maxWidth: "200px"}}
                                    size="sm"
                                    onClick={() => toggleNewCategoryModal(!showNewCategoryModal)}
                                >
                                    Add Category
                                </Button>
                            </Col>
                            <Col className="pl-2 ml-2">
                                <Button
                                    variant="primary"
                                    style={{maxWidth: "250px"}}
                                    size="sm"
                                    onClick={() => toggleShowCopyLastMonthsCategories(!showCopyLastMonthsCategories)}
                                >
                                    Copy Last Month's Categories
                                </Button>
                            </Col>
                        </Row>
                        {showNewCategoryModal && (
                            <CategoryModal closeModal={() => toggleNewCategoryModal(!showNewCategoryModal)} selectedDate={selectedDate} />
                        )}
                        {showCopyLastMonthsCategories && (
                            <CopyLastMonthsCategoriesModal
                                closeModal={() => toggleShowCopyLastMonthsCategories(!showCopyLastMonthsCategories)}
                                fromMonth={Number(selectedDate.month)}
                                fromYear={selectedDate.year}
                                />
                        )}
                    </>
                    ) : (
                        <Transactions transactions={transactions} txChanged={txChanged} setTXChanged={setTXChanged} />
                )}
            </Container>
        </CategoriesContext.Provider>
    );
};

export default Budget;
