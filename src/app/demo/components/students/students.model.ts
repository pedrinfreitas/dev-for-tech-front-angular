export interface IStudentsAPI {
    data: IStudents[];
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
