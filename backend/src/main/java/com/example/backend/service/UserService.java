package com.example.backend.service;

import com.example.backend.dao.RoleDao;
import com.example.backend.dao.UserDao;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerNewUser(User user) {
        Role role = roleDao.findById(user.getRole().getRoleName()).get();
        user.setRole(role);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        userDao.save(user);
    }

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("A manager of the restaurant.");
        roleDao.save(adminRole);

        Role hostRole = new Role();
        hostRole.setRoleName("Host");
        hostRole.setRoleDescription("The person to take orders and invite guests in.");
        roleDao.save(hostRole);

        Role waiterRole = new Role();
        waiterRole.setRoleName("Waiter");
        waiterRole.setRoleDescription("Waiter or waitress.");
        roleDao.save(waiterRole);

        Role cookRole = new Role();
        cookRole.setRoleName("Cook");
        cookRole.setRoleDescription("A person who works in the kitchen.");
        roleDao.save(cookRole);

        User adminUser = new User();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setRole(adminRole);
        userDao.save(adminUser);

        User user = new User();
        user.setUserName("host");
        user.setUserPassword(getEncodedPassword("host@pass"));
        user.setUserFirstName("Default");
        user.setUserLastName("Host");
        user.setRole(hostRole);
        userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public List<Role> getAllRoles() {
        return roleDao.findAll();
    }

    public void deleteUser(String userName) {
        List<User> users = getAllUsers();
        for (User u : users)
            if (u.getUserName().equals(userName)) {
                Role role = u.getRole();
                userDao.delete(u);
                roleDao.save(role);
            }
    }
}
