### Backend folder ###

**copy .env.example values to your own .env file**

### Running the db

```sh
  docker compose -f docker-compose-development.yml up db
```

### Running the backend

From the backend directory:

```
./gradlew bootRun
```

### Accessing the API documentation

When the backend is running, open:
http://localhost:8080/docs

### Running tests

**Unit tests:**
```
./gradlew.bat test
```

For code formatting please run the command:
```
./gradlew.bat spotlessApply
```