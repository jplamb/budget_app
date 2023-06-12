import api from '../axiosConfig';
import {Category} from "../Interfaces/Category";

async function getCategoriesForMonth(month: number, year: number): Promise<Category[]> {
  console.log(`fetching categories for month ${month} of ${year}`);
  try {
    const response = await api.get<any[]>(`categories/?year=${year}&month=${month}`, {});
    return response.data.map(category => {
      return {
        id: category.id,
        name: category.name,
        amount: Number(category.amount),
        month_id: category.month.id
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }



}

export default getCategoriesForMonth;
