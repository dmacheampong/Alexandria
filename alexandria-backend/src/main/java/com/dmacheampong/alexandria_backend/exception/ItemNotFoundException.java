package com.dmacheampong.alexandria_backend.exception;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Long id) {
        super("Item with id not found.");
    }
}
