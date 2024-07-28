# Use the official Python image as the base image
FROM python:slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the required packages
RUN pip install -r requirements.txt

# copy .env file to the working directory
COPY .env .

# Copy the application code to the working directory
COPY . .
# Set the environment variable for the timezone
ENV TZ=America/Boston
# Set the environment variable for the MongoDB URL
# ENV MONGODB_URL=<your_mongodb_url_here>

# Expose the port on which the Flask application will run
EXPOSE 5000

# Start the Flask application
CMD ["python", "server.py"]