import { create } from 'zustand';

interface OrderForm {
  name: string;
  phone: string;
  address: string;
}

interface OrderFormStore {
  form: OrderForm;
  updateForm: (field: keyof OrderForm, value: string) => void;
  clearForm: () => void;
}

export const useOrderFormStore = create<OrderFormStore>((set) => ({
  form: {
    name: '',
    phone: '',
    address: '',
  },
  updateForm: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),
  clearForm: () =>
    set({
      form: {
        name: '',
        phone: '',
        address: '',
      },
    }),
}));
