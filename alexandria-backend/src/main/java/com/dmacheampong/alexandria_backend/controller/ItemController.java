package com.dmacheampong.alexandria_backend.controller;
import com.dmacheampong.alexandria_backend.exception.ItemNotFoundException;
import com.dmacheampong.alexandria_backend.model.Item;
import com.dmacheampong.alexandria_backend.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/item")
    Item newItem(@RequestBody Item newItem) {
        return itemRepository.save(newItem);
    }

    @GetMapping("/items")
    List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/item/{id}")
    Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id).orElseThrow(()-> new ItemNotFoundException(id));
    }

    @PutMapping("/item/{id}")
    Item updateItem(@RequestBody Item newItem, @PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(newItem.getName());
                    item.setCoverURL(newItem.getCoverURL());
                    item.setType(newItem.getType());
                    item.setGenre(newItem.getGenre());
                    item.setAuthor(newItem.getAuthor());
                    item.setPublisher(newItem.getPublisher());
                    item.setStatus(newItem.getStatus());
                    return itemRepository.save(item);
                }).orElseThrow(()->new ItemNotFoundException(id));
    }

    @DeleteMapping("/item/{id}")
    String deleteItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException(id);
        }
        itemRepository.deleteById(id);
        return "Item with id "+id+" has been successfully deleted.";
    }
}
