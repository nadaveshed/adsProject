package com.example.adspage.service;

import com.example.adspage.models.Apartment;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ApartmentService {

    private final Map<Long, Apartment> apartmentMap = new HashMap<>();
    private long nextApartmentId = 1;


    public List<Apartment> getAllApartments() {
        return new ArrayList<>(apartmentMap.values());
    }

    public Apartment addApartment(Apartment apartment) {
        apartment.setId(nextApartmentId++);
        apartmentMap.put(apartment.getId(), apartment);
        return apartment;
    }

    public Apartment updateApartment(Long id, Apartment updatedApartment) {
        if (!apartmentMap.containsKey(id)) {
            throw new EntityNotFoundException("Apartment not found with id: " + id);
        }

        updatedApartment.setId(id);
        apartmentMap.put(id, updatedApartment);
        return updatedApartment;
    }

    public void deleteApartment(Long id) {
        apartmentMap.remove(id);
        System.out.println("Apartment removed");
    }
}
