package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.equipment.service.EquipmentService;
import com.example.equipment.model.Equipment;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // for React later
public class EquipmentController {

    private final EquipmentService equipmentService;

    // GET all equipment
    @GetMapping
    public List<Equipment> getAll() {
        return equipmentService.getAll();
    }

    // POST new equipment
    @PostMapping
    public Equipment create(@RequestBody Equipment equipment) {
        return equipmentService.create(equipment);
    }

    // PUT update equipment
    @PutMapping("/{id}")
    public Equipment update(@PathVariable Long id, @RequestBody Equipment equipment) {
        return equipmentService.update(id, equipment);
    }

    // DELETE equipment
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        equipmentService.delete(id);
    }
}