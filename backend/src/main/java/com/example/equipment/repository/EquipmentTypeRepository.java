package com.example.equipment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.equipment.model.EquipmentType;

public interface EquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
}