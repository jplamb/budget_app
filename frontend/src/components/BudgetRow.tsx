import React from 'react';
import {BudgetCategories} from "../utils/config";
import {Button} from "react-bootstrap";
import {RiPencilFill} from "react-icons/ri";
import {GiTrashCan} from "react-icons/gi";
import DeleteModal from "./DeleteModal";
import {Category} from "../Interfaces/Category";
import deleteCategory from "../utils/deleteCategory";
import CategoryModal from "./CategoryModal";
import {CategoriesContext} from "./Budget";


interface BudgetRowProps {
    category: Category;
    categoryActual: number;
    isTableHeader: boolean;
    isEditable?: boolean;
}
const BudgetRow: React.FC<BudgetRowProps> = ({ category , categoryActual, isTableHeader, isEditable}) => {
    const {setCategories} = React.useContext(CategoriesContext);

    const [toggleDeleteModal, setToggleDeleteModal] = React.useState<boolean>(false);
    const [toggleCategoryModal, setToggleCategoryModal] = React.useState<boolean>(false);

    let actualAmount;
    if (category.name === BudgetCategories.Recurring.name) {
        actualAmount = BudgetCategories.Recurring.budgetedAmount;
    } else if (category.name === BudgetCategories.Income.name) {
        actualAmount = -1 * categoryActual;

    } else {
        actualAmount = categoryActual;
    }
    console.log(category.name, actualAmount, category.amount);

    const formatForNegative = (amount: number) => {
        return amount < 0 ? `-$${Math.abs(amount).toFixed(0)}` : `$${amount.toFixed(0)}`;
    }

    return (
        <>
            <tr className={`BudgetRow ${isTableHeader ? 'table-primary' : 'table-dark'}`}>
                {isTableHeader ? (
                    <>
                        <th className="categoryName header">
                            {category.name}
                        </th>
                        <th className="categoryBudgetedAmount header text-center">
                            ${category.amount.toFixed(0)}
                        </th>
                        {!isEditable && (
                            <>
                                <th className="categoryActualAmount header text-center">
                                    {formatForNegative(actualAmount)}
                                </th>
                                <th className="categoryDiffAmount header text-center">
                                    {formatForNegative(category.amount - actualAmount)}
                                </th>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <th className="categoryName">
                            {category.name}
                        </th>
                        <td className="categoryBudgetedAmount text-center">
                            ${category.amount.toFixed(0)}
                        </td>
                        {!isEditable && (
                            <>
                                <td className="categoryActualAmount text-center">
                                    {formatForNegative(actualAmount)}
                                </td>
                                <td className="categorydiffAmount text-center">
                                    {formatForNegative(category.amount - actualAmount)}
                                </td>
                            </>
                        )}
                        {isEditable && (
                            <>
                                <td className="categoryEdit">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => {setToggleCategoryModal(!toggleCategoryModal)}}
                                    >
                                        <RiPencilFill />
                                    </Button>
                                </td>
                                <td className="categoryEdit">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => {setToggleDeleteModal(!toggleDeleteModal)}}
                                    >
                                        <GiTrashCan />
                                    </Button>
                                </td>
                            </>
                        )}
                    </>
                )}
            </tr>
            {toggleDeleteModal && (
                <DeleteModal closeModal={() => setToggleDeleteModal(!toggleDeleteModal)} item={category} deleteItem={deleteCategory} updateItems={setCategories} />
            )}
            {toggleCategoryModal && (
                <CategoryModal closeModal={() => setToggleCategoryModal(!toggleCategoryModal)} category={category} />
            )}
        </>
    );
};

export default BudgetRow;
