create table if not exists usuarios (
  id serial primary key,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  cpf text NOT NULL UNIQUE,
  telefone text NOT NULL,
  cep text default NULL,
  rua text default NULL,
  bairro text default NULL,
  cidade text default NULL,
  estado text default NULL,
  complemento text default NULL,
  senha text NOT NULL
  );