package com.example.adspage.service;

import com.example.adspage.models.Car;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CarService {

    private final Map<Long, Car> carMap = new HashMap<>();
    private long nextCarId = 1;


    public List<Car> getAllCars() {
        return new ArrayList<>(carMap.values());
    }

    public Car addCar(Car car) {
        car.setId(nextCarId++);
        carMap.put(car.getId(), car);
        return car;
    }

    public Car updateCar(Long id, Car updateCar) {
        if (!carMap.containsKey(id)) {
            throw new EntityNotFoundException("Car not found with id: " + id);
        }

        updateCar.setId(id);
        carMap.put(id, updateCar);
        return updateCar;
    }

    public void deleteCar(Long id) {
        carMap.remove(id);
    }
}
