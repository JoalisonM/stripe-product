# Como utilizar o sistema

## Rodar o backend
Caso não tenha o pip e/ou o virtualenv [instalar aqui](https://gist.github.com/umr55766/02084fd38b0426775411ab8353376c69)

- `cd backend`
- `virtualenv venv`
- `source venv/bin/activate`
- `pip3 install -r requirements.txt`

#### Configuração e execução do flask_restful
- `export FLASK_APP=app.py`
- `export FLASK_DEBUG=1`
- `flask run`

## Instalação das dependências do frontend
- `cd doce-vida`
- `npm install ou yarn install`

## Construção e execução do Docker
#### Construção
- `docker build -t doce-vida . `

#### Execução
- `docker run --name doce-vida -p 8080:80 -d doce-vida `