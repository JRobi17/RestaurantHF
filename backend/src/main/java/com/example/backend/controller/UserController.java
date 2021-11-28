package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    @PostMapping({"/registerNewUser"})
    public String registerNewUser(@RequestBody User user) {
        Iterable<User> users = getAllUsers();
        for (User u : users)
            if (u.getUserName().equals(user.getUserName()))
                return "Már létezik felhasználó ezzel a felhasználónévvel";
        userService.registerNewUser(user);
        return "Sikeres regisztráció";
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }

    @GetMapping({"/getAllUsers"})
    public List<User> getAllUsers() { return userService.getAllUsers(); }

    @DeleteMapping("{userName}")
    public String deleteDriver(@PathVariable String userName){
        if (userService.deleteUser(userName))
            return "Sikeres törlés";
        return "Sikertelen törlés, nincs ilyen felhasználó.";
    }
}
