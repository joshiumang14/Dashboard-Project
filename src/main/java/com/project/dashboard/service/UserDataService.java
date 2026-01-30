package com.project.dashboard.service;
import com.project.dashboard.entity.UserData;
import com.project.dashboard.repository.UserDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataService {

    private final UserDataRepository repo;

    public UserDataService(UserDataRepository repo) {
        this.repo = repo;
    }

    public List<UserData> getAll() {
        return repo.findAll();
    }

    public UserData save(UserData data) {
        return repo.save(data);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}
