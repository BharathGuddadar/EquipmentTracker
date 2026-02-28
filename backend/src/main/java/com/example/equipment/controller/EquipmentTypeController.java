package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.equipment.repository.EquipmentTypeRepository;
import com.example.equipment.model.EquipmentType;

import java.util.List;

@RestController
@RequestMapping("/api/types")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EquipmentTypeController {

    private final EquipmentTypeRepository equipmentTypeRepository;

    @GetMapping
    public List<EquipmentType> getAllTypes() {
        return equipmentTypeRepository.findAll();
    }
}