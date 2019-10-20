interface ICategory {
    id?: number;
    name: string;
}

export class Category implements ICategory {
    id?: number;
    name: string;
    constructor() {
            this.id = null;
            this.name = '';
    }
}
