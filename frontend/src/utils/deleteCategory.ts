import api from '../axiosConfig';
import {Category} from "../Interfaces/Category";

async function deleteCategory(category: Category): Promise<number> {
  console.log(`deleting category`);
  try {
    const response = await api.delete<any[]>(`categories/${category.id}/`, {});
    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default deleteCategory;
