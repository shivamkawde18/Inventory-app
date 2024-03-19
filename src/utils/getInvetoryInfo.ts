import { Item } from "../types";

export const getValue = (filterData: Item[]) => {
  return (
    filterData?.reduce((total: number, currentValue: Item) => {
      const numericValue = parseFloat(currentValue.value.replace("$", ""));
      return isNaN(numericValue) ? total : total + numericValue;
    }, 0) || 0
  );
};

export const outOfStock = (filterData: Item[]) => {
  return filterData?.filter((item: Item) => Number(item.quantity) === 0);
};

export const numberOfCategory = (filterData: Item[]) => {
  const uniqueCategories = new Set();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueData = filterData?.reduce((acc: any, obj: Item) => {
    if (!uniqueCategories.has(obj.category)) {
      uniqueCategories.add(obj.category);
      acc?.push(obj);
    }
    return acc;
  }, []);
  return uniqueData;
};
