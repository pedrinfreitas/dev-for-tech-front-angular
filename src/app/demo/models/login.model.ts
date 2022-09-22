export interface ILoginResponse {
    sub: string;
    nome: string;
    roles: [
        {
            id: number;
            description: string;
            authority: string;
        }
    ];
    iat: number;
    exp: number;
}
