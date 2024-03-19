import { ReactNode } from "react";

export interface ICustomProps {
  icon?: ReactNode;
  value: number;
  text: string|number|undefined;
}
