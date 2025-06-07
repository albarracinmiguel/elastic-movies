# Elastic Movies API

Base project using Node.js, Express and Elasticsearch. The API provides a minimal example for indexing and searching movie documents.

## Requirements
- Node.js 14+
- Access to an Elasticsearch instance (default: `http://localhost:9200`)

## Installation

```bash
npm install
```

## Running tests

```bash
npm test
```

## Running the server

```bash
npm start
```

The server listens on `http://localhost:3000` by default. Use `PORT` and `ELASTIC_NODE` environment variables to customize the configuration.

## Available endpoints
- `POST /movies` – index a movie document (JSON body)
- `GET /movies/:id` – retrieve a movie by id
- `GET /search?q=<term>` – search movies by title
