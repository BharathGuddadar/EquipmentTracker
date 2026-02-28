package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.equipment.repository.*;
import com.example.equipment.model.*;
import com.example.equipment.exception.BusinessException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceLog addMaintenance(MaintenanceLog log) {

        Equipment equipment = equipmentRepository.findById(log.getEquipment().getId())
                .orElseThrow(() -> new BusinessException("Equipment not found"));

        // Business rule: auto update equipment
        equipment.setStatus("Active");
        equipment.setLastCleanedDate(log.getMaintenanceDate());

        equipmentRepository.save(equipment);

        log.setEquipment(equipment);
        return maintenanceRepository.save(log);
    }

    public List<MaintenanceLog> getMaintenanceByEquipment(Long equipmentId) {
        return maintenanceRepository.findByEquipmentId(equipmentId);
    }
}