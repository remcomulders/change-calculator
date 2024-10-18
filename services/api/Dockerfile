FROM eclipse-temurin:23-jdk

# Install Maven
RUN apt-get update && \
    apt-get install -y maven

# Set the working directory
WORKDIR /app

# Copy the pom.xml to resolve dependencies
COPY pom.xml .

# Download dependencies for offline usage
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the application and skip tests
RUN mvn clean package -DskipTests

# Expose the port the application runs on
EXPOSE 8080

# Run the application
# CMD ["java", "-jar", "target/api-1.0.jar"]
CMD ["mvn", "spring-boot:run"]
