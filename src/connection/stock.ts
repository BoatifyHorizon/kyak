export interface StockItemEntity {
  id: number;
  name: string;
  description: string;
  img: string;
  imgAlt: string;
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
          img: "https://i.imgur.com/st2pBjb.png",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 2,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 7,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 8,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 9,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 232,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 231231,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 2312312312,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 1os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 1,
          id: 3,
          img: "",
          imgAlt: "morska_1os",
        },
        {
          name: "Morska 2os",
          description: "Morska łódka 1-osobowa do szybkiego ścigania.",
          capacity: 2,
          id: 4,
          img: "",
          imgAlt: "morska_2os",
        },
      ]);
    }, 3000);
  });
};

export const getWioslaItems = (): Promise<StockItemEntity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Wiosło x2ds",
          description: "Wiosło z wyciągniętą głowicą pod szybkie ataki.",
          id: 1,
          img: "https://aquamarina-isup.pl/eng_pl_Aqua-Marina-Wioslo-kajakowe-KP-2-outlet-7044_4.jpg",
          imgAlt: "wioslo_x2ds",
        },
      ]);
    }, 3000);
  });
};

export const getOdziezItems = (): Promise<StockItemEntity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Strój wioślarza WSP",
          description: "Wodoodporny strój wioślarski z napędem aerohydraulicznym.",
          id: 1,
          img: "https://sporttastic.pl/images/zdjecia-produktow/WRATISLAVIA/watermark/wpx_5650de06f4dac1232603caffa66208cc.png",
          imgAlt: "odziez_wsp",
        },
      ]);
    }, 3000);
  });
};
