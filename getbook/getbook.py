from collections import OrderedDict


# Data structure to store the boos
class Cache:

    def __init__(self, Capacity):
        self.size = Capacity
        self.cache = OrderedDict()

    def get(self, key: int):
        if key not in self.cache:
            return -1
        val = self.cache[key]
        self.cache.move_to_end(key)
        return val

    def put(self, key: int, val) -> None:
        if key in self.cache:
            del self.cache[key]
        self.cache[key] = val
        # remove item if used
        if len(self.cache) > self.size:
            self.cache.popitem(last=False)


# Actual wrapper function
cache = Cache(200)


def get_book_cached(isbn: int):

    if cache.get(isbn) == -1:
        book = get_book_info(isbn)
        cache.put(isbn, book)
    else:
        return cache.get(isbn)
