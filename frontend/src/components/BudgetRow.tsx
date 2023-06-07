import React from 'react';
import {BudgetCategories} from "../utils/config";


interface BudgetRowProps {
    categoryName: string;
    categoryBudget: number;
    categoryActual: number;
    isTableHeader: boolean;
}
const BudgetRow: React.FC<BudgetRowProps> = ({ categoryName, categoryBudget , categoryActual, isTableHeader}) => {
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

    return (
        <tr className={`BudgetRow ${isTableHeader ? 'table-primary' : 'table-dark'}`}>
            {isTableHeader ? (
                <>
                    <th className="categoryName header">
                        {categoryName}
                    </th>
                    <th className="categoryBudgetedAmount header">
                        ${categoryBudget.toFixed(0)}
                    </th>
                    <th className="categoryActualAmount header">
                        {formatForNegative(actualAmount)}
                    </th>
                    <th className="categoryDiffAmount header">
                        {formatForNegative(categoryBudget - actualAmount)}
                    </th>
                </>
            ) : (
                <>
                    <th className="categoryName">
                        {categoryName}
                    </th>
                    <td className="categoryBudgetedAmount">
                        ${categoryBudget.toFixed(0)}
                    </td>
                    <td className="categoryActualAmount">
                        {formatForNegative(actualAmount)}
                    </td>
                    <td className="categorydiffAmount">
                        {formatForNegative(categoryBudget - actualAmount)}
                    </td>
                </>
            )}
        </tr>
      );
};

export default BudgetRow;
