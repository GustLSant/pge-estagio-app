import { AccountCredentials, User, Process } from "../types"


type Database = {
    accountCredentials: AccountCredentials[],
    users: User[],
    process: Process[]
}


export const defaultDatabase:Database = {
    accountCredentials: [
        {
            id: 0,
            email: 'jr',
            password: 'jrsenha',
        },
        {
            id: 1,
            email: 'ch',
            password: 'chsenha',
        },
        {
            id: 2,
            email: 'marianalopes@gmail.com',
            password: 'marianasenha',
        },
        {
            id: 3,
            email: 'rafaelmoura@gmail.com',
            password: 'rafaelsenha',
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
            registerDate: new Date('2023/06/17'),
        },
        {
            id: 2,
            shortName: 'Mariana Lopes',
            fullName: 'Mariana Lopes de Andrade',
            role: 'client',
            email: 'marianalopes@gmail.com',
            cpf: '182.456.930-44',
            registerDate: new Date('2024/05/23'),
        },
        {
            id: 3,
            shortName: 'Rafael Moura',
            fullName: 'Rafael Moura Bezerra',
            role: 'attorney',
            email: 'rafaelmoura@gmail.com',
            cpf: '758.321.490-67',
            oab: 'OAB/SP-67890',
            registerDate: new Date('2024/12/02'),
        }
    ],
    process: [
        {
            id: 0,
            number: '1023456-78.2023.8.21.0032',
            status: 'filled',
            attorneyId: 1,
            clientId: 0,
            place: 'Fórum Gumersino Bessa - Comarca de Aracaju - SE',
            courtDivision: '3º Vara Cível de Aracaju',
            court: 'Tribunal de Justiça do Estado de Sergipe (TJSE)',
            startDate: new Date('2025/03/23'),
            endDate: new Date('2025/03/23'),
        },
        {
            id: 1,
            number: '2023456-78.2023.8.26.0100',
            status: 'filled',
            attorneyId: 3,
            clientId: 0,
            place: 'Fórum João Mendes - São Paulo - SP',
            courtDivision: '1ª Vara de Família e Sucessões',
            court: 'Tribunal de Justiça do Estado de São Paulo (TJSP)',
            startDate: new Date('2025/03/07'),
            endDate: new Date('2025/03/07'),
        },
        {
            id: 2,
            number: '3023456-78.2023.8.19.0001',
            status: 'pending',
            attorneyId: 3,
            clientId: 2,
            place: 'Fórum Central - Rio de Janeiro - RJ',
            courtDivision: '2ª Vara Cível',
            court: 'Tribunal de Justiça do Estado do Rio de Janeiro (TJRJ)',
            startDate: new Date('2025/03/10'),
            endDate: new Date('2025/03/10'),
        },
        {
            id: 3,
            number: '4023456-78.2023.8.13.0000',
            status: 'pending',
            attorneyId: 1,
            clientId: 2,
            place: 'Fórum Lafayette - Belo Horizonte - MG',
            courtDivision: '4ª Vara de Execuções Criminais',
            court: 'Tribunal de Justiça do Estado de Minas Gerais (TJMG)',
            startDate: new Date('2025/03/19'),
            endDate: new Date('2025/03/19'),
        },
        {
            id: 4,
            number: '5023456-78.2023.8.17.2001',
            status: 'pending',
            attorneyId: 3,
            clientId: 0,
            place: 'Fórum Rodolfo Aureliano - Recife - PE',
            courtDivision: '5ª Vara de Sucessões',
            court: 'Tribunal de Justiça de Pernambuco (TJPE)',
            startDate: new Date('2025/03/05'),
            endDate: new Date('2025/03/05'),
        },
        {
            id: 5,
            number: '6023456-78.2023.8.10.0001',
            status: 'ruled',
            attorneyId: 1,
            clientId: 0,
            place: 'Fórum Des. Sarney Costa - São Luís - MA',
            courtDivision: '2ª Vara da Fazenda Pública',
            court: 'Tribunal de Justiça do Maranhão (TJMA)',
            startDate: new Date('2025/03/21'),
            endDate: new Date('2025/03/21'),
        },
        {
            id: 6,
            number: '7023456-78.2023.8.25.0001',
            status: 'ruled',
            attorneyId: 1,
            clientId: 2,
            place: 'Fórum da Comarca de Itabaiana - SE',
            courtDivision: '1ª Vara Cível',
            court: 'Tribunal de Justiça do Estado de Sergipe (TJSE)',
            startDate: new Date('2025/03/22'),
            endDate: new Date('2025/03/22'),
        },
        {
            id: 7,
            number: '8023456-78.2023.8.20.0100',
            status: 'ruled',
            attorneyId: 1,
            clientId: 0,
            place: 'Fórum Miguel Seabra Fagundes - Natal - RN',
            courtDivision: 'Vara de Família',
            court: 'Tribunal de Justiça do Rio Grande do Norte (TJRN)',
            startDate: new Date('2025/03/18'),
            endDate: new Date('2025/03/18'),
        },
        {
            id: 8,
            number: '9023456-78.2023.8.11.0001',
            status: 'suspended',
            attorneyId: 1,
            clientId: 2,
            place: 'Fórum de Cuiabá - MT',
            courtDivision: '3ª Vara Criminal',
            court: 'Tribunal de Justiça de Mato Grosso (TJMT)',
            startDate: new Date('2025/03/06'),
            endDate: new Date('2025/03/06'),
        },
        {
            id: 9,
            number: '0123456-78.2023.8.15.0001',
            status: 'suspended',
            attorneyId: 3,
            clientId: 0,
            place: 'Fórum Cível - João Pessoa - PB',
            courtDivision: '4ª Vara de Família',
            court: 'Tribunal de Justiça da Paraíba (TJPB)',
            startDate: new Date('2025/03/25'),
            endDate: new Date('2025/03/25'),
        },
    ]
}