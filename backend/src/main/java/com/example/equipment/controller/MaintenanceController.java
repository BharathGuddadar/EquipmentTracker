package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.equipment.service.MaintenanceService;
import com.example.equipment.model.MaintenanceLog;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    // POST maintenance
    @PostMapping("/api/maintenance")
    public MaintenanceLog addMaintenance(@RequestBody MaintenanceLog log) {
        return maintenanceService.addMaintenance(log);
    }

    // GET maintenance by equipment
    @GetMapping("/api/equipment/{id}/maintenance")
    public List<MaintenanceLog> getMaintenance(@PathVariable Long id) {
        return maintenanceService.getMaintenanceByEquipment(id);
    }
}