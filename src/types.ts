export type UserRole = 'client' | 'attorney';

export type ProcessStatus = 'filled' | 'pending' | 'ruled' | 'suspended'; // autuado, em andamento, julgado, suspenso

export type Response = {
    status: 200 | 201 | 401 | 404 | 500,
    message: string,
    data: any,
}

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
    status: ProcessStatus,
    attorneyId: number,
    attorneyFullName: string,
    clientId: number,
    clientFullName: string,
    place: string,
    courtDivision: string,
    court: string,
    startDate: Date,
    endDate: Date | undefined,
}


