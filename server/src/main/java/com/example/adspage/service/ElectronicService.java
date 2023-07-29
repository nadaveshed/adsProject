package com.example.adspage.service;

import com.example.adspage.models.Electronic;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ElectronicService {

    private final Map<Long, Electronic> electronicsMap = new HashMap<>();
    private long nextAElectronicId = 1;


    public List<Electronic> getAllElectronics() {
        return new ArrayList<>(electronicsMap.values());
    }

    public Electronic addElectronic(Electronic electronic) {
        electronic.setId(nextAElectronicId++);
        electronicsMap.put(electronic.getId(), electronic);
        return electronic;
    }

    public Electronic updateElectronic(Long id, Electronic updatedElectronic) {
        if (!electronicsMap.containsKey(id)) {
            throw new EntityNotFoundException("Device not found with id: " + id);
        }

        updatedElectronic.setId(id);
        electronicsMap.put(id, updatedElectronic);
        return updatedElectronic;
    }

    public void deleteElectronic(Long id) {
        electronicsMap.remove(id);
    }
}
