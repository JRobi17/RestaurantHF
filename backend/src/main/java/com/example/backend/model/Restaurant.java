package com.example.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Restaurant {

    @Id
    private int id = 1;
    private int grandTotal;
    private String imagePath = "https://www.logolynx.com/images/logolynx/ed/ed984f0195019c4355f58f416bc3e120.jpeg";

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(int grandTotal) {
        this.grandTotal = grandTotal;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
