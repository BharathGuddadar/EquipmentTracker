package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.equipment.repository.*;
import com.example.equipment.model.*;
import com.example.equipment.exception.BusinessException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;

    public List<Equipment> getAll() {
        return equipmentRepository.findAll();
    }

    public Equipment create(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment update(Long id, Equipment updatedEquipment) {
        Equipment existing = equipmentRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Equipment not found"));

        // 30-day rule
        if ("Active".equalsIgnoreCase(updatedEquipment.getStatus())) {
            if (updatedEquipment.getLastCleanedDate() == null ||
                    updatedEquipment.getLastCleanedDate().isBefore(LocalDate.now().minusDays(30))) {
                throw new BusinessException("Equipment cannot be Active if last cleaned date is older than 30 days");
            }
        }

        existing.setName(updatedEquipment.getName());
        existing.setType(updatedEquipment.getType());
        existing.setStatus(updatedEquipment.getStatus());
        existing.setLastCleanedDate(updatedEquipment.getLastCleanedDate());

        return equipmentRepository.save(existing);
    }

    public void delete(Long id) {
        equipmentRepository.deleteById(id);
    }
}