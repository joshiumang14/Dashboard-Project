package com.project.dashboard.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "user_data")
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String city;
    private int score;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public String getCity() { return city; }
    public int getScore() { return score; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setRole(String role) { this.role = role; }
    public void setCity(String city) { this.city = city; }
    public void setScore(int score) { this.score = score; }
}
