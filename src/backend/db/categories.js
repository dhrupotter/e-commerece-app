import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Mugs",
    img: "https://i.etsystatic.com/39030409/r/il/f003dd/4948091934/il_794xN.4948091934_cr65.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Plates",
    img: "https://i.etsystatic.com/37630770/r/il/9307da/4885901652/il_794xN.4885901652_oojj.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Jwellery Organizer",
    img: "https://i.etsystatic.com/11273377/r/il/7b99f0/4681304382/il_794xN.4681304382_s2tw.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Planters",
    img: "https://i.etsystatic.com/38710199/r/il/5835c8/4365452962/il_794xN.4365452962_jes3.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Lamps",
    img: "https://i.etsystatic.com/42752647/r/il/15a02d/4950252065/il_794xN.4950252065_hmmu.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Showpieces",
    img: "https://i.etsystatic.com/37537950/r/il/b5b8a2/4946565772/il_794xN.4946565772_kwqw.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Spoons",
    img: "https://i.etsystatic.com/36476273/r/il/88cafa/4075407195/il_794xN.4075407195_t7ad.jpg",
  },
];
