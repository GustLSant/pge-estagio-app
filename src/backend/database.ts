export type AccountCredentialType = {
    id: number,                /* mesmo ID do User */
    email: string,
    password: string,
}

export type UserType = {
    id: number,                /* mesmo ID do AccountCredential */
    shortName: string,
    fullName: string,
    role: 'client' | 'attorney',
    email: string,
    cpf: string,
    oab?: string | undefined,  /* somente procuradores possuem esse campo */
    registerDate: Date,        /* formato ISO 8601: yyyy-mm-ddThh:mm:ss */
}

export type ProcessType = {
    id: number,
    number: string,
    attorneyId: number,
    clientId: number,
    place: string,
    courtDivision: string,
    court: string,
    startDate: Date,
    endDate: Date,
}

type Database = {
    accountCredentials: AccountCredentialType[],
    users: UserType[],
    process: ProcessType[]
}


export const defaultDatabase:Database = {
    accountCredentials: [
        {
            id: 0,
            email: 'josericardo@gmail.com',
            password: 'josericardosenha',
        },
        {
            id: 1,
            email: 'carloshenrique@gmail.com',
            password: 'carloshenriquesenha',
        },
    ],
    users: [
        {
            id: 0,
            shortName: 'José Ricardo',
            fullName: 'José Ricardo da Silva Teixeira',
            role: 'client',
            email: 'josericardo@gmail.com',
            cpf: '547.937.800-75',
            registerDate: new Date('2025/03/16'),
        },
        {
            id: 1,
            shortName: 'Carlos Henrique',
            fullName: 'Carlos Henrique Monteiro',
            role: 'attorney',
            email: 'carloshenrique@gmail.com',
            cpf: '339.241.560-00',
            oab: 'OAB/SE-12345',
            registerDate: new Date('2025/03/16'),
        }
    ],
    process: [
        {
            id: 0,
            number: '1023456-78.2023.8.21.0032',
            attorneyId: 1,
            clientId: 0,
            place: 'Fórum Gumersino Bessa - Comarca de Aracaju - SE',
            courtDivision: '3º Vara Cível de Aracaju',
            court: 'Tribunal de Justiça do Estado de Sergipe (TJSE)',
            startDate: new Date('2025/03/16'),
            endDate: new Date('2025/03/16'),
        }
    ]
}