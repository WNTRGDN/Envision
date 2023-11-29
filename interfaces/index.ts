export interface IWebsite {
    id: number;
    key: string;
    name: string;
    routes: IRoute[];
    menus: IMenu[];
    settings: ISettings;
    gA4: string;
    socials: ISocials;
    sitemap: IUrl[];
    form: IForm;x
    createDate: Date;
    updateDate: Date;
}

export interface IUrl {
    loc: string,
    lastmod: string,
    changefreq: string,
    priority: number
}

export interface IForm extends IBlock {
    id: string,
    name: string,
    allFields: IField[],
    fields: IField[],
    containers: IContainer[],
    messageOnSubmit: string,
    nextLabel: string,
    prevLabel: string,
    submitLabel: string,
    fieldTypes: Record<string, string>
}

export interface IContainer {
    caption: string,
    id: string,
    rows: IRow[],
    sortOrder: number
}

export interface IRow {
    caption: string,
    cols: ICol[],
    condition: string,
    id: string,
    sortOrder: number
}

export interface ICol {
    caption: string,
    fields: IField[],
    width: number
}

export interface IField {
    alias: string,
    blockAlias: string,
    allowMultipleFileUploads: boolean,
    allowedUploadTypes: object,
    caption: string,
    containsSensitiveData: boolean,
    cssClass: string,
    fieldTypeId: string,
    fieldType: string,
    id: string,
    invalidErrorMessage: string,
    mandatory: boolean,
    placeholder: string,
    preValues: IPrevalue[],
    regEx: string,
    requiredErrorMessage: string,
    settings: IFormFieldSettings,
    submitting: boolean
}

export interface IPrevalue {
    caption: string,
    value: string
}

export interface IFormFieldSettings {
    autocompleteAttribute: string,
    defaultValue: string,
    fieldType: string,
    maximumLength: string,
    numberOfRows: number,
    placeholder: string,
    showLabel: string
}

export interface IHTMLFormElement extends HTMLFormElement {
    readonly elements: IHTMLFormControlsCollection;
}

interface IHTMLFormControlsCollection extends HTMLFormControlsCollection {
    [key: string]: HTMLInputElement | any;
}

export interface ISocials {
    facebook: string;
    instagram: string;
    twitter: string
}

export interface IRoute {
    [key:string]: number;
}

export interface IParams {
    slug: string[];
}

export interface ICrops {
    Hero: string,
    Thumbnail: string,
    Banner: string
}

export interface IPage {
    id: number;
    key: string;
    level: number;
    name: string;
    url: string;
    blocks: IBlock[];
    metaData: IMetaData;
    createDate: string;
    updateDate: string;
    breadcrumbs: IBreadcrumb[];
}

export interface IBreadcrumb {
    title: string,
    url: string
}

export interface IMetaData {
    title: string;
    keywords: string[];
    description: string;
    image: string;
}

export interface ISettings {
    address: string;
    email: string;
    logo: string;
    phone: string;
    openingHours: IOpeningHours[];
}

export interface IMenu {
    title: string;
    links: ILink[];
    includeHome: boolean;
    alias: string;
    exists: boolean;
}

export interface ILink {
    title: string;
    url: string;
}

export interface IOpeningHours {
    day: string;
    opening: Date;
    closing: Date;
    order: number;
}

export interface IBlock {
    type: string;
    alias: string;
    order: number;
}

export interface IHeader {
    settings: ISettings;
    menus: IMenu[];
}

export interface IFooter {
    settings: ISettings;
    menus: IMenu[];
    name: string;
    socials: ISocials;
}