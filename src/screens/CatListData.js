import hus from "../img/hus.png";
import Image from "react-native";

//Was formerly const but constant cant be changed, so used let.
let CatListData = [
    {
        id: "1",
        name: "Fruits",
        image: require("../categoryimages/orangesimage.jpg"),
    },
    {
        id: "2",
        name: "Vegetables",
        image: require("../categoryimages/kaleimage.jpg"),
    },
    {
        id: "3",
        name: "Meat & Seafood",
        image: require("../categoryimages/beefimage.jpg"),
    },

    {
        id: "4",
        name: "Bread & Bakery",
        image: require("../categoryimages/breadimage.jpg"),
    },

    {
        id: "5",
        name: "Dairy & Eggs",
        image: require("../categoryimages/eggimage.jpg"),
    },
    {
        id: "6",
        name: "Drinks",
        image: require("../categoryimages/juiceima.jpg"),
    },
    {
        id: "7",
        name: "Spices,Sauces & Oil",
        image: require("../categoryimages/spiceimage.jpg"),
    },
    {
        id: "8",
        name: "Pasta, Noodles & Grains",
        image: require("../categoryimages/pasta.jpeg"),
    },
    {
        id: "9",
        name: "Dried,Pantry & Tubers",
        image: require("../categoryimages/tuberimage.jpg"),
    },
    {
        id: "10",
        name: "Grocery Boxes & Deals",
        image: require("../rmg/Deals.png"),
    },
    {
        id: "11",
        name: "Vegan",
        image: require("../categoryimages/vegimage.jpg"),
    },
    {
        id: "12",
        name: "Skincare",
        image: require("../categoryimages/care.png"),
    }
];
export default CatListData;
