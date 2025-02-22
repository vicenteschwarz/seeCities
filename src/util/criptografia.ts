export class Criptografia{
    
    static criptografar(texto: string): string{
    return `Senha criptografada: ${Buffer.from(texto).toString('base64')}`
    }

    static descriptografar(textoCriptografado: string): string{
    return `mensagem descriptografada: ${Buffer.from(textoCriptografado, 'base64').toString('utf-8')}`
    }
}