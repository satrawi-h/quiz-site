# Nginx Quiz Site


Welcome to the Nginx Quiz Site! This README provides an overview of the project, setup instructions, and usage guidelines.

## Overview

The Nginx Quiz Site is a web application designed to host quizzes. It uses Nginx as the web server to serve the application efficiently.

## Features

- Host multiple quizzes
- User-friendly interface
- Real-time quiz results
- Secure and scalable

## Prerequisites

- Docker
- Docker Compose

## Project Structure

The project directory structure is as follows:

```
nginx-quiz-site/
├── config/
│   └── nginx/
│       └── nginx.conf
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── index.html
│   ├── styles/
│   └── scripts/
├── README.md
└── LICENSE
```

- `config/nginx/nginx.conf`: Nginx configuration file.
- `docker-compose.yml`: Docker Compose configuration file.
- `Dockerfile`: Dockerfile for building the application image.
- `src/`: Directory containing the web application source code.
- `README.md`: Project documentation.
- `LICENSE`: License file.
## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/nginx-quiz-site.git
   cd nginx-quiz-site
   ```

2. Build and start the Docker containers:
   ```sh
   docker-compose up --build
   ```

3. Access the site:
   Open your web browser and navigate to `http://localhost:8080`.
## Docker Compose Installation

If you prefer to use a pre-built Docker image, you can pull the image from Docker Hub and run it using Docker Compose.

1. Pull the Docker image:
   ```sh
   docker pull theinfamoustoto/quiz-site
   ```

2. Create a `docker-compose.yml` file with the following content:
   ```yaml
   version: '3'
   services:
     quiz-site:
       image: theinfamoustoto/quiz-site
       ports:
         - "8080:80"
   ```

3. Start the Docker container:
   ```sh
   docker-compose up
   ```

4. Access the site:
   Open your web browser and navigate to `http://localhost:8080`.
## Configuration

The Nginx configuration file is located at `config/nginx/nginx.conf`. You can modify this file to change the server settings as needed.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or support, please open an issue on the GitHub repository or contact the maintainer on Discord at `theinfamoustoto`.

Thank you for using the Nginx Quiz Site!

