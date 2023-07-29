package com.example.adspage.models;

import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String manufacturer;
    private String model;
    private int year;
    private int hand;
    private String paint;
    private int distance;
    private double price;

    public void setId(Long id) {
        this.id = id;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setHand(int hand) {
        this.hand = hand;
    }

    public void setPaint(String paint) {
        this.paint = paint;
    }

    public void setDistance(int km) {
        this.distance = km;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
