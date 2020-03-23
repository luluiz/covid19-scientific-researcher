import { Deserializable } from "./deserializable.model";

export class Article implements Deserializable {
    _id?: string;
    title: string;
    authors: string;
    abstract: string;
    published_year: string;
    published_month: string;
    journal: string;
    volume: string;
    issue: string;
    pages: string;
    accession: string;
    doi: string;
    ref: string;
    covidence: string;
    study: string;
    notes: string;
    tags: string;
    tags_array: string;
    created: Date;
    updated: Date;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}


