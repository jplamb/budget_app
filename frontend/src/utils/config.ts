export interface BudgetCategoryConfig {
    name: string;
    description: string;
    budgetedAmount: number;
}

export interface BudgetConfig {
    [name: string]: BudgetCategoryConfig;
}

export const BudgetCategories: BudgetConfig  = {
    'Income': {
        'name': 'Income',
        'description': 'Total monthly income',
        'budgetedAmount': 14140
    },
    'Mortgage': {
        'name': 'Mortgage',
        'description': 'Mortgage including HOA fee',
        'budgetedAmount': 2555.16
    },
    'Utilities': {
        'name': 'Utilities',
        'description': 'Utilities including water/trash, gas, electric, and internet',
        'budgetedAmount': 300
    },
    'Cell Phone': {
        'name': 'Cell Phone',
        'description': 'Cell phone bill',
        'budgetedAmount': 59
    },
    'Recurring': {
        'name': 'Recurring',
        'description': 'Recurring subscriptions',
        'budgetedAmount': 245.79
    },
    'Savings': {
        'name': 'Savings',
        'description': 'Total monthly savings to be divvied up into individual savings accounts',
        'budgetedAmount': 3650
    },
    'Tithe': {
        'name': 'Tithe',
        'description': 'Amount contributed to DAF',
        'budgetedAmount': 2400
    },
    'Gifts': {
        'name': 'Gifts',
        'description': 'Gifts for birthdays, weddings, etc.',
        'budgetedAmount': 125
    },
    'Vacation': {
        'name': 'Vacation',
        'description': 'Vacation fund',
        'budgetedAmount': 650
    },
    'Counseling': {
        'name': 'Counseling',
        'description': 'Counseling',
        'budgetedAmount': 270
    },
    'Clothing': {
        'name': 'Clothing',
        'description': 'Ava\'s clothing allowance',
        'budgetedAmount': 250
    },
    'Car': {
        'name': 'Car',
        'description': 'John\'s car allowance',
        'budgetedAmount': 0
    },
    'Medical': {
        'name': 'Medical',
        'description': 'Medical fund to account for deductible',
        'budgetedAmount': 150
    },
    'Gas': {
        'name': 'Gas',
        'description': 'Gas for cars',
        'budgetedAmount': 100
    },
    'Food': {
        'name': 'Food',
        'description': 'Expenses for fund outside of groceries',
        'budgetedAmount': 500
    },
    'Groceries': {
        'name': 'Groceries',
        'description': 'Groceries',
        'budgetedAmount': 850
    },
    'Other': {
        'name': 'Other',
        'description': 'Other expenses',
        'budgetedAmount': 0
    }
};

export const MonthConfig: any[] = [
    {
        'month': 'January',
        'monthNumber': 0,
    },
    {
        'month': 'February',
        'monthNumber': 1,
    },
    {
        'month': 'March',
        'monthNumber': 2,
    },
    {
        'month': 'April',
        'monthNumber': 3,
    },
    {
        'month': 'May',
        'monthNumber': 4,
    },
    {
        'month': 'June',
        'monthNumber': 5,
    },
    {
        'month': 'July',
        'monthNumber': 6,
    },
    {
        'month': 'August',
        'monthNumber': 7,
    },
    {
        'month': 'September',
        'monthNumber': 8,
    },
    {
        'month': 'October',
        'monthNumber': 9,
    },
    {
        'month': 'November',
        'monthNumber': 10,
    },
    {
        'month': 'December',
        'monthNumber': 11,
    }
];