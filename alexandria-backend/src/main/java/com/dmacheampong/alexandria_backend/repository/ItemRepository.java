package com.dmacheampong.alexandria_backend.repository;

import com.dmacheampong.alexandria_backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
