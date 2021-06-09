# Picovoice software engineer interview questions

I have chosen the first three questions to answer. Each question is in its own folder

### get_book_info

The wrapper function is called get_book_cached. To use it you need to pass in a cache object since the capacity of the cache is unknown ahead of time.

main() has a example on using the cache and wrapper function and very basic tests.

### Countries rest API

Features: type in the search bar and hit enter to get countries' neighbouring capitals
Currently no responsive design because no time

### Rroduct rating

Currently kinda working. I know my code is kinda janky but I really don't have time to polish my code.
I built a go server to serve the data for testing. run it with `go run main.go` in the APIserver directory and then `npm start` in the widget directory
Go server will log the new rating request
