import api from '../axiosConfig';
import {Category} from "../Interfaces/Category";

async function createCategory(category: Category): Promise<number> {
  console.log(`creating category: ${JSON.stringify(category)}`);
  try {
    const response = await api.post<any[]>(`categories/`, {
      amount: Number(category.amount),
      name: category.name,
      raw_month: category.rawMonth,
      year: category.year,
    });

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default createCategory;
