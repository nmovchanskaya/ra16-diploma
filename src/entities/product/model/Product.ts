import { Size } from "../../size/model/Size"

export interface Product {
    id: number,
    title: string,
    price: number,
    images: string[],
    sizes: Size[],
    sku: number,
    manufacturer: string,
    color: string,
    material: string,
    season: string,
    reason: string
}