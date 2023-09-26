import { IBlock } from "WNTR/interfaces";

export default interface ISplit {
    blocks: IBlock[];
    type: string;
    alias: string;
}