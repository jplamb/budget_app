import api from '../axiosConfig';

async function copyPriorMonthCategories(fromMonth: number, fromYear: number, toMonth: number, toYear: number): Promise<number> {
  console.log(`copying categories from ${fromMonth}/${fromYear} to ${toMonth}/${toYear}`);
  try {
    const response = await api.post<any[]>(`copyMonthCategories/`, {
      fromMonth,
      fromYear,
      toMonth,
      toYear
    });

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export default copyPriorMonthCategories;
