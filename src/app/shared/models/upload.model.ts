import { Deserializable } from "./deserializable.model";

export class Upload implements Deserializable {
    _id?: string;
    pathfile: string
    qty_articles: number
    authors: string
    journals: string
    tags: string
    created: Date
    updated: Date

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}



