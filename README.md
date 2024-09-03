# Law Assistant Using RAG and LLM

## Overview

This project features a Django-based backend that integrates Retrieval-Augmented Generation (RAG) with a Language Model (LLM) to provide legal question answering. It utilizes my [Legal Embedding Model](https://github.com/trungmac07/VN_Law_Embedding) to convert legal documents into vector embeddings. The system then uses cosine similarity to match the user's legal questions with relevant documents, enabling OpenAI's GPT-4 API to generate contextually accurate responses.

## Features

**Legal Question Answering:** Leverages RAG to retrieve relevant legal documents and generate responses using GPT-4.

**Embedding Similarity:** My fine-tuned [Legal Embedding Model](https://github.com/trungmac07/VN_Law_Embedding) is used to embed legal questions and documents. It computes the similarity between the questions and documents to identify the top-k most relevant documents for each query.

**Efficient Document Management:** Manages and retrieves document embeddings with PyTorch.

**Django Backend:** Implements a RESTful API to handle questions and responses, including an authorization system and chat history management.

**React Frontend:** Utilizes MVC architecture to deliver a user interface for legal advice, questions, and answers.

**Streaming Responses:** Streams answers from the LLM to provide real-time feedback to the client.

## Prerequisites

- Python 3.11.9 or higher
- Django 5.1
- PyTorch 2.4.0+cu121
- React 18.3.1
- OpenAI API Key

## Install and Set Up

### Clone the Repository
```sh
git clone https://github.com/trungmac07/Law_Assistant


## Install and Set Up

### Clone the Repository
```sh
git clone https://github.com/trungmac07/Law_Assistant
```

### Install Dependencies
```sh
pip install -r requirements.txt
```

### Data and Set Up
Download the data directory from [here.](https://drive.google.com/drive/folders/1Th0Cy7XbfjKMbIjmA5R-qII4IZLugJnb?usp=sharing)

Extract the `preprocessed_laws.zip` and `embedding_model` inside - These are legal documents and a pre-trained embedding model.

Open the file .key and paste your OpenAI organization (first line) and API key (second line).

Then paste `data` directory into the `Law_Assistant/Django_Server/`.


### Database
PostgreSQL Database:
Configure the settings in the file at Django_Server\Django_Server\settings.py under the `DATABASES` variable:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'name_of_postgresql_database',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

### Apply Migrations
```sh
python manage.py makemigrations
```

```sh
python manage.py migrate
```

## Usage


### Server

#### Run Server

Go to the Django_Server directory
```sh
cd .\Django_Server\
```
Run server - (By default server runs on localhost:8000)
```sh
python manage.py runserver
```

### Client
#### Run Client
Go to the react-client directory
```sh
cd .\react_client\ 
```
Run client - (By default client runs on localhost:3000)
```sh
npm run start
```

### Client URLs
|URLs|Pages|
|----|----|
|`localhost:3000/login` | Login page | 
|`localhost:3000/signup` | Signup page |
|`localhost:3000/home` | Home page |



