package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Product struct {
	ID     int     `json:"ID"`
	Name   string  `json:"Title"`
	Desc   string  `json:"desc"`
	Rating float32 `json:"rating"`
}

type Rating struct {
	ProductID int     `json:"ProductID"`
	UserID    int     `json:"userID"`
	Rating    float32 `json:"rating"`
}

// Global variable to store the products
var Products []Product
var Ratings []Rating

// Home page API end point
func homePage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

// function to return a single product by ID
func returnSingleProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	key, _ := strconv.Atoi(vars["id"])

	for _, prod := range Products {
		if prod.ID == key {
			json.NewEncoder(w).Encode(prod)
		}
	}
}

// All products End Point
func returnAllProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("Endpoint Hit: returnAllProducts")
	json.NewEncoder(w).Encode(Products)
}

// handle updating product rating
func updateProductRating(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	fmt.Println("Endpoint Hit: update Product Rating")
	reqBody, _ := ioutil.ReadAll(r.Body)
	var rating Rating
	json.Unmarshal(reqBody, &rating)

	Ratings = append(Ratings, rating)

	fmt.Println("New ratings recorded")
	json.NewEncoder(w).Encode(rating)
}

func handleRequests() {
	// creates a new instance of a mux router
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage).Methods("GET")
	myRouter.HandleFunc("/all", returnAllProducts).Methods("GET")
	myRouter.HandleFunc("/product/{id:[0-9+]}", returnSingleProduct).Methods("GET")
	myRouter.HandleFunc("/rate", updateProductRating).Methods("POST")

	myRouter.Use(mux.CORSMethodMiddleware(myRouter))
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
	Products = []Product{
		{ID: 1, Name: "Product 1", Desc: "Product Description", Rating: 3.75},
		{ID: 2, Name: "Product 2", Desc: "Product Description", Rating: 2.75},
		{ID: 3, Name: "Product 3", Desc: "Product Description", Rating: 1.75},
		{ID: 4, Name: "Product 4", Desc: "Product Description", Rating: 5},
		{ID: 5, Name: "Product 5", Desc: "Product Description", Rating: 3},
		{ID: 6, Name: "Product 6", Desc: "Product Description", Rating: 3.25},
		{ID: 7, Name: "Product 7", Desc: "Product Description", Rating: 4.8},
		{ID: 8, Name: "Product 8", Desc: "Product Description", Rating: 1.2},
	}
	fmt.Println("Starting a server on localhost:10000")
	handleRequests()
}
