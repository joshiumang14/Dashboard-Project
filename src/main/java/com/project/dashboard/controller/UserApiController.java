package com.project.dashboard.controller;

import com.project.dashboard.entity.UserData;
import com.project.dashboard.service.UserDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserApiController {

    private final UserDataService service;

    public UserApiController(UserDataService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserData> getUsers() {
        return service.getAll();
    }

    @PostMapping
    public UserData addUser(@RequestBody UserData data) {
        return service.save(data);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        service.delete(id);
    }
}
