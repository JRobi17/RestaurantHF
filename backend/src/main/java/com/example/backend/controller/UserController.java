package com.example.backend.controller;

import com.example.backend.model.Role;
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
    @PreAuthorize("hasRole('Admin')")
    public String registerNewUser(@RequestBody User user) {
        Iterable<User> users = getAllUsers();
        for (User u : users)
            if (u.getUserName().equals(user.getUserName()))
                return "Már létezik felhasználó ezzel a felhasználónévvel";
        userService.registerNewUser(user);
        return "Sikeres regisztráció";
    }

    @GetMapping({"/getAllUsers"})
    @PreAuthorize("hasRole('Admin')")
    public List<User> getAllUsers() { return userService.getAllUsers(); }

    @GetMapping({"/getAllRoles"})
    @PreAuthorize("hasRole('Admin')")
    public List<Role> getAllRoles() { return userService.getAllRoles(); }

    @DeleteMapping("{userName}")
    @PreAuthorize("hasRole('Admin')")
    public void deleteUser(@PathVariable String userName) { userService.deleteUser(userName); }
}
