import { create } from "zustand";

type SetDataProps = {
  key: string;
  value: number;
};

type DataState = {
  data: Record<string, number>;
  setData: (props: SetDataProps) => void;
};

export const useData = create<DataState>((set) => ({
  data: { Revenue: 1250, Customers: 50, Cost: 99 },
  setData: ({ key, value }) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: value,
      },
    })),
}));

type SetFormulaProps = {
  key: string;
  value: string;
};

type FormulaState = {
  formula: Record<string, string>;
  setFormula: (props: SetFormulaProps) => void;
};

export const useFormula = create<FormulaState>((set) => ({
  formula: {
    Revenue: "[Revenue]+151",
    Customers: "[Customers]",
    Cost: "[Cost] * 50",
    "Revenue + Cost": "[Revenue]+[Cost]",
  },
  setFormula: ({ key, value }) =>
    set((state) => ({
      formula: {
        ...state.formula,
        [key]: value,
      },
    })),
}));
