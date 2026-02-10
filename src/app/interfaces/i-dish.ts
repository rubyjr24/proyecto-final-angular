import { DishType } from "../enums/dish-type";

export interface IDish {
    id?: string,
    name: string,
    description: string,
    price: number,
    catergory: DishType,
    image?: string,
    enabled: boolean
}
