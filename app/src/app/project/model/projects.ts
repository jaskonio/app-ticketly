interface IProject {
    id?: number;
    name: string;
    description: string;
}

type NewType = IProject;

export class Project implements NewType {
    id?: number;
    name: string;
    description: string;
    constructor() {
            this.id = null;
            this.name = '';
            this.description = '';
    }
}
