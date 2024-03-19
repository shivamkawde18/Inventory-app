export interface ImyTableProps {
  isLoading: boolean;
  isError: boolean;
  data: unknown;
}
export type Item = {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
  visible: boolean;
};