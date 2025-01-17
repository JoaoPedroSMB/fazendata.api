
# Fazendata

**Fazendata** é uma solução simples e eficiente que utiliza tecnologia NFC para facilitar o gerenciamento de informações do gado. Com ele, é possível ler e gravar dados diretamente em tags NFC, otimizando o controle e o acompanhamento dos animais na sua fazenda.

## 📋 Índice

- [Introdução](#introdução)  
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Requisitos](#requisitos)  
- [Instalação](#instalação)  
- [Uso](#uso)  

---

## 🐄 Introdução

O **Fazendata** foi projetado para atender produtores rurais que buscam uma forma prática de organizar e acessar informações sobre o rebanho. Ele utiliza tags NFC como base para armazenar dados essenciais, como:
- Idade
- Peso
- Data da última vacinação
- Histórico de saúde
- entre outros

Essa tecnologia elimina a necessidade de registros manuais ou papéis, proporcionando mais segurança e agilidade no gerenciamento dos dados.

---

## ✨ Funcionalidades

- **Leitura de Tags NFC**: Obtenha informações sobre o animal ao aproximar o dispositivo NFC.
- **Gravação de Dados**: Grave informações do gado diretamente em uma tag NFC e no banco de dados.
- **Armazenamento em Banco de Dados**: Os dados também são gravados em um banco de dados, garantindo backup e acessibilidade.
- **Interface Amigável**: Aplicativo com interface simples e intuitiva.
- **Suporte a Atualizações**: Atualize as informações de uma tag existente com novos dados.
- **Segurança**: Garante que os dados gravados estejam protegidos contra sobrescrições não autorizadas.

---

## 🛠️ Tecnologias Utilizadas

O Fazendata foi desenvolvido utilizando as seguintes tecnologias principais:

- **NestJS**: Framework backend usado para criar uma API robusta e escalável.
- **Supabase**: Banco de dados e autenticação em tempo real para armazenar e gerenciar as informações do gado.
- **React Native**: Framework frontend para criar um aplicativo móvel multiplataforma (Android e iOS).

---

## 🖥️ Requisitos

Para usar o Fazendata, você precisará de:

1. Um dispositivo com suporte a NFC (smartphone ou tablet).
2. Sistema operacional: 
   - Android 7.0 ou superior.
3. Tags NFC compatíveis.

---

## 🚀 Instalação

1. **Clone os repositórios:**
   ```bash
   git clone https://github.com/taigakilla/fazendata.git
   cd fazendata
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure o .env:**
   ```bash
   Crie um arquivo .env e Usar o .envExemple para configurar as chaves do .env
    ```

4. **Inicie o aplicativo:**
   ```bash
   npm start
    ```
    ```
    Obs: O backend (fazendata.api) tem que estar rodando
   ```
---

## 📚 Uso

1. Abra o aplicativo Fazendata no seu dispositivo.
2. Escolha entre as opções **Ler Tag** ou **Gravar Dados**.
3. Para gravação:
   - Na página de cadastro
   - Escolha o tipo de gado
   - Preencha os campos necessários (como peso, idade, etc.).
   - Encoste o dispositivo na tag NFC para gravar os dados.
4. Para leitura:
   - Na tela de inicio
   - Clique em "Ler tag NFC"
   - Aproximar a tag NFC do dispositivo.
   - Visualize as informações armazenadas diretamente no aplicativo.

---
