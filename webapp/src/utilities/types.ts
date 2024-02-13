export interface User {
    username: string,
    email: string,
    password: string,
}

export interface Category {
    name: string;
}

export interface Tag {
    name: string;
    icon: string | null;
}

export interface Item {
    sku: string;
    name: string;
    tags: Tag[];
    category: Category;
    stockStatus: number;
    availableStock: number;
}