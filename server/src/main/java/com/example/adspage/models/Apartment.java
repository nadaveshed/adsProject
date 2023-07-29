package com.example.adspage.models;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Apartment {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String rentOrSell;
    private int size;
    private int rooms;
    private double price;

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRentOrSell(String rentOrSell) {
        this.rentOrSell = rentOrSell;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public void setPrice(double price) {
        this.price = price;
    }


// Constructors, getters, setters
}