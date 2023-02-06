export const dataStateMock: State[] = [
  {
    id: 1,
    fee: 0.01,
    name: 'MG',
  },
  {
    id: 2,
    fee: 0.05,
    name: 'SP',
  },
  {
    id: 3,
    fee: 0.09,
    name: 'ES',
  },
  {
    id: 4,
    fee: 0.07,
    name: 'RJ',
  },
];

export type State = {
  id: number;
  fee: number;
  name: string;
};
