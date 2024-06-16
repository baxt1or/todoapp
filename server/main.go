package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("hello world")

	if os.Getenv("ENV") != "production" {
		// Load the .env file if not in production
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading .env file:", err)
		}
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	defer func() {
		if err = client.Disconnect(context.Background()); err != nil {
			log.Fatal("Failed to disconnect from MongoDB:", err)
		}
	}()

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	fmt.Println("Connected to MONGODB ATLAS")

	collection = client.Database("goland_db").Collection("todos")

	app := fiber.New()

	// Uncomment if needed
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	app.Get("/api/todos",getTodos)
	app.Post("/api/create-todo", createTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	log.Printf("Starting server on port %s...\n", port)
	log.Fatal(app.Listen(":" + port))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Println("Error finding todos:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			log.Println("Error decoding todo:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Failed to decode todo"})
		}
		todos = append(todos, todo)
	}

	if err := cursor.Err(); err != nil {
		log.Println("Cursor error:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Cursor error"})
	}

	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		log.Println("Error parsing body:", err)
		return c.Status(400).JSON(fiber.Map{"error": "Failed to parse request body"})
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body cannot be empty"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		log.Println("Error inserting todo:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert todo"})
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}
