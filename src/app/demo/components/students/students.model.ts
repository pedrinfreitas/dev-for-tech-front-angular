export interface IStudentsAPIResponse {
    _embedded: {
        studentDTOList: IStudentsApi[];
    };
}

export interface IStudentsApi {
    id?: number;
    fees?: string;
    pessoa?: {
        id?: number;
        name?: string;
        phoneNumber?: string;
        emailAddress?: string;
        addres?: {
            id?: 1;
            street?: string;
            city?: string;
            country?: string;
            postalCode?: string;
            state?: string;
        };
    };
    classeID?: number;
    createUser?: boolean;
    _links?: {
        self?: {
            href?: string;
        };
    };
}

export interface IStudents {
    id?: string;
    name?: string;
    phone?: string;
    fees?: string;
    email?: string;
    street?: string;
    city?: string;
    country?: string;
    state?: string;
    cep?: string;
}
