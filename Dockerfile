# Use the official Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the HTML file into the container
COPY index.html /app/index.html

# Expose port 8000
EXPOSE 8000

# Start a simple HTTP server
CMD ["python3", "-m", "http.server", "8000"]
