from collections import OrderedDict

# used for testing
from dataclasses import dataclass


class Cache:
    # Data structure to store the boos

    def __init__(self, Capacity):
        self.size = Capacity
        self.cache = OrderedDict()

    def get(self, key: str):
        # return -1 if not found
        if key not in self.cache:
            return -1
        # if found, move to end
        val = self.cache[key]
        self.cache.move_to_end(key)
        return val

    def put(self, key: str, val) -> None:
        if key in self.cache:
            del self.cache[key]
        self.cache[key] = val
        # remove item if used
        if len(self.cache) > self.size:
            self.cache.popitem(last=False)


# Actual wrapper function
def get_book_cached(isbn: str, cache: Cache):

    if cache.get(isbn) == -1:
        book = get_book_info(isbn)
        cache.put(isbn, book)
        return book
    else:
        return cache.get(isbn)

#########################################
#### NOT RELATED TO WRAPPER FUNCTION ####
#########################################


@dataclass()
class Book:
    # dummy class used for testing
    Title: str
    Author: str
    Language: str


def get_book_info(isbn: str):
    # dummy ISBN function
    if(books[isbn]):
        return books[isbn]
    return -1


books = {}


def main():
    # adding book to my lib
    for i in range(30):
        book = Book(f'{i} Title', f'{i} Author', 'English')
        books[str(i)] = book

    # example of how to use the getbook function
    cache = Cache(10)

    # testing
    for i in range(15):
        isbn = str(i)
        test = get_book_cached(isbn, cache)
        assert(books[isbn] == test)
        print(f'Test passed on book # {isbn}')


if __name__ == "__main__":
    main()
