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
    public String registerNewUser(@RequestBody User user) { return userService.registerNewUser(user); }

    @GetMapping({"/getAllUsers"})
    public List<User> getAllUsers() { return userService.getAllUsers(); }

    @GetMapping({"/getAllRoles"})
    public List<Role> getAllRoles() { return userService.getAllRoles(); }

    @DeleteMapping("{userName}")
    public void deleteUser(@PathVariable String userName) { userService.deleteUser(userName); }
}
