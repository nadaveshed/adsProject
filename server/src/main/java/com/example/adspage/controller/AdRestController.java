package com.example.adspage.controller;

import com.example.adspage.models.Apartment;
import com.example.adspage.models.Car;
import com.example.adspage.models.Electronic;
import com.example.adspage.service.ApartmentService;
import com.example.adspage.service.CarService;
import com.example.adspage.service.ElectronicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin
public class AdRestController {

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private CarService carService;

    @Autowired
    private ElectronicService electronicsService;

    // Get all apartments
    @GetMapping("/apartments")
    public List<Apartment> getAllApartments() {
        return apartmentService.getAllApartments();
    }

    // Get all cars
    @GetMapping("/cars")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    // Get all electronics
    @GetMapping("/electronics")
    public List<Electronic> getAllElectronics() {
        return electronicsService.getAllElectronics();
    }

    // Add an apartment
    @PostMapping("/apartments")
    public Apartment addApartment(@RequestBody Apartment apartment) {
        return apartmentService.addApartment(apartment);
    }

    // Add a car
    @PostMapping("/cars")
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    // Add an electronic item
    @PostMapping("/electronics")
    public Electronic addElectronic(@RequestBody Electronic electronics) {
        return electronicsService.addElectronic(electronics);
    }

    // Update an apartment
    @PutMapping("/apartments/{id}")
    public Apartment updateApartment(@PathVariable Long id, @RequestBody Apartment updatedApartment) {
        return apartmentService.updateApartment(id, updatedApartment);
    }

    // Update a car
    @PutMapping("/cars/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        return carService.updateCar(id, updatedCar);
    }

    // Update an electronic item
    @PutMapping("/electronics/{id}")
    public Electronic updateElectronic(@PathVariable Long id, @RequestBody Electronic updatedElectronic) {
        return electronicsService.updateElectronic(id, updatedElectronic);
    }

    // Delete an apartment
    @DeleteMapping("/apartments/{id}")
    public void deleteApartment(@PathVariable Long id) {
        apartmentService.deleteApartment(id);
    }

    // Delete a car
    @DeleteMapping("/cars/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }

    // Delete an electronic item
    @DeleteMapping("/electronics/{id}")
    public void deleteElectronic(@PathVariable Long id) {
        electronicsService.deleteElectronic(id);
    }
}
