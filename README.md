# Law Assistant Using RAG and LLM

## Overview
This project provides a Django-based backend that integrates Retrieval-Augmented Generation (RAG) with a Language Model (LLM) for answering legal questions. It uses precomputed embeddings of legal documents stored in a PyTorch tensor and OpenAI's GPT-4 API to generate contextually relevant responses based on the user's queries.

## Features

**Legal Question Answering:** Leverages RAG to retrieve relevant legal documents and generate responses using GPT-4.

**Django Backend:** Provides RESTFUL API for questions and responses

**Streaming Responses:** Streams answers from the LLM to provide real-time feedback.

**Efficient Document Management:** Manages and retrieves document embeddings with PyTorch.

## Prerequisites

Python 3.8 or higher

Django 4.x

PyTorch

OpenAI API Key

## Install

### Clone the Repository
```sh
git clone https://github.com/trungmac07/Law_Assistant
```

### Install Dependencies
```sh
pip install -r requirements.txt
```

### Data and Set Up
Download the data file from [here](here), extract into the Law_Assistant/Django_Server directory

Open the file .key and paste your OpenAI organization (first line) and API key (second line)

### Apply Migrations

```sh
python manage.py migrate
```

### Run Server
```sh
python manage.py runserver
```
