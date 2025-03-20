import { ProcessStatus } from "./types";

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function getDiegestableStatusName(status:ProcessStatus): string{
    switch (status){
        case 'filled':
            return 'Autuado';
        case 'pending':
            return 'Em Andamento';
        case 'ruled':
            return 'Julgado';
        case 'suspended':
            return 'Suspenso';
    }
}