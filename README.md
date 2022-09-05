# Bemo-backend

## O que o usuário pode fazer

- Fazer login
- Cadastrar uma nova conta

## Endpoints

### POST - Cadastro

#### Dados Enviados
 - Body:
   - nome
   - email
   - cpf
   - telefone
   - cep	
   - rua
   - bairro
   - cidade
   - estado
   - complemento
   - senha

 ##### Validações
 - nome -> obrigatório
 - email -> deve ser no formato de email (obrigatório)
 - cpf -> obrigatório
 - telefone -> obrigatório
 - senha -> deve ter no mínimo 6 caracteres (obrigatório)
 

 OBS: Não será possível cadastrar uma usuário caso já exista um com o mesmo cpf, telefone ou email.
    
#### Dados Retornados
 - sucesso/erro
 

### POST - Login

#### Dados Enviados
 - Body:
 
   - email
   - senha
 
 ##### Validações
 
 - email -> deve ser no formato de email (obrigatório)
 - senha -> deve ter no mínimo 6 caracteres (obrigatório)
  
    
#### Dados Retornados
 - usuário:
   - id
   - nome
   - email
   - token 
   
## Links

**Repositório de Backend**: https://github.com/aranchipe/Bemol-backend

**Repositório de Frontend**: https://github.com/aranchipe/Bemol-frontend

**URL da aplicação funcionando**: https://bemol.netlify.app/

**URL da API**: https://bemol-backend.herokuapp.com
