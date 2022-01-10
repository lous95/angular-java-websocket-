package com.example.backend.data.entities;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class Color {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Column
    private String color;
    @Column
    private Integer votes;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getVotes() {
        return votes;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public Color incrementVotes() {
        votes++;
        return this;
    }
}
