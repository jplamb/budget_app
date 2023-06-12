import React from 'react';
import {BudgetCategories} from "../utils/config";
import {Button} from "react-bootstrap";
import {RiPencilFill} from "react-icons/ri";
import {GiTrashCan} from "react-icons/gi";


interface BudgetRowProps {
    categoryName: string;
    categoryBudget: number;
    categoryActual: number;
    isTableHeader: boolean;
    isEditable?: boolean;
}
const BudgetRow: React.FC<BudgetRowProps> = ({ categoryName, categoryBudget , categoryActual, isTableHeader, isEditable}) => {
    let actualAmount;
    if (categoryName === BudgetCategories.Recurring.name) {
        actualAmount = BudgetCategories.Recurring.budgetedAmount;
    } else if (categoryName === BudgetCategories.Income.name) {
        actualAmount = -1 * categoryActual;

    } else {
        actualAmount = categoryActual;
    }
    console.log(categoryName, actualAmount);

    const formatForNegative = (amount: number) => {
        return amount < 0 ? `-$${Math.abs(amount).toFixed(0)}` : `$${amount.toFixed(0)}`;
    }

    const updateCategoryAmount = () => {
        console.log("updateCategoryAmount");
    };

    const deleteCategory = () => {
        console.log("deleteCategory");
    };

    return (
        <tr className={`BudgetRow ${isTableHeader ? 'table-primary' : 'table-dark'}`}>
            {isTableHeader ? (
                <>
                    <th className="categoryName header">
                        {categoryName}
                    </th>
                    <th className="categoryBudgetedAmount header text-center">
                        ${categoryBudget.toFixed(0)}
                    </th>
                    <th className="categoryActualAmount header text-center">
                        {formatForNegative(actualAmount)}
                    </th>
                    <th className="categoryDiffAmount header text-center">
                        {formatForNegative(categoryBudget - actualAmount)}
                    </th>
                </>
            ) : (
                <>
                    <th className="categoryName">
                        {categoryName}
                    </th>
                    <td className="categoryBudgetedAmount text-center">
                        ${categoryBudget.toFixed(0)}
                    </td>
                    <td className="categoryActualAmount text-center">
                        {formatForNegative(actualAmount)}
                    </td>
                    <td className="categorydiffAmount text-center">
                        {formatForNegative(categoryBudget - actualAmount)}
                    </td>
                    {isEditable && (
                        <>
                            <td className="categoryEdit">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {updateCategoryAmount}}
                                >
                                    <RiPencilFill />
                                </Button>
                            </td>
                            <td className="categoryEdit">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {deleteCategory}}
                                >
                                    <GiTrashCan />
                                </Button>
                            </td>
                        </>
                    )}
                </>
            )}
        </tr>
      );
};

export default BudgetRow;
