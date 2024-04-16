//Substitui todos os caracteres que são letras, espaços ou hifens por uma string vazia e põem em caixa baixa, ele remove caracteres especiais

export function generateSlug(text: string): string {
    return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+g/, "-")
    
}