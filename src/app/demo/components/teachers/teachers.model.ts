export interface ITeachersAPIResponse {
    _embedded: {
        teacherDTOList: ITeachersApi[];
    },
    page?: {
        size?: number;
        totalElements?: number;
        totalPages?: number;
        number?: number;
    };
}

export interface ITeachersApi {
    id?: number;
    salary?: number;
    pessoa?: {
        id?: number;
        name?: string;
        phoneNumber?: string;
        emailAddress?: string;
        addres?: {
            id?: number;
            street?: string;
            city?: string;
            country?: string;
            postalCode?: string;
            state?: string;
        };
    };
    createUser?: boolean;
    _links?: {
        self?: {
            href?: string;
        };
    };
}

export interface ITeachers {
    id?: string;
    name?: string;
    phone?: string;
    salary?: string;
    email?: string;
    street?: string;
    city?: string;
    country?: string;
    state?: string;
    cep?: string;
    createUser?: boolean;
}
