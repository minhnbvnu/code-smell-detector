function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }