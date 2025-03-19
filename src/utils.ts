import { ProcessStatus } from "./types";

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function makeStatusDiegestible(status:ProcessStatus){
    if(status === "filled"){ return 'Autuado'; }
    else if(status === "pending"){ return 'Em Andamento'; }
    else if(status === "ruled"){ return 'Julgado'; }
    else if(status === "suspended"){ return 'Suspenso'; }
}