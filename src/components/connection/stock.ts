export interface StockItemEntity {
  id: number;
  name: string;
  description: string;
}

export interface LodkaItem extends StockItemEntity {
  capacity: number;
}

export const getLodkaItems = (): Promise<LodkaItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 1,
        },
      ]);
    }, 3000);
  });
};
