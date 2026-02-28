package com.example.equipment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.equipment.model.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}