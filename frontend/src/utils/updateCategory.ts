import api from '../axiosConfig';
import {Category} from "../Interfaces/Category";

async function updateCategory(category: Category): Promise<number> {
  console.log(`updating category`);
  try {
    const response = await api.patch<any[]>(`categories/${category.id}/`, {
      id: category.id,
      amount: category.amount,
      name: category.name,
    });

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default updateCategory;
