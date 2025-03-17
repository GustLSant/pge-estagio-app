export type UserRole = 'client' | 'attorney';

export type AccountCredentials = {
    id: number,                /* mesmo ID do User */
    email: string,
    password: string,
}

export type User = {
    id: number,                /* mesmo ID do AccountCredential */
    shortName: string,
    fullName: string,
    role: UserRole,
    email: string,
    cpf: string,
    oab?: string | undefined,  /* somente procuradores possuem esse campo */
    registerDate: Date,        /* formato ISO 8601: yyyy-mm-ddThh:mm:ss */
}

export type Process = {
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


