export default interface ICards {
    heading: string;
    items: ICard[];
    type: string;
    alias: string;
}

export interface ICard {
    image: string;
    link: string;
    text: string;
    title: string;
}