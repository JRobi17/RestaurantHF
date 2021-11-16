package com.example.backend.service;

import com.example.backend.dao.RoleDao;
import com.example.backend.dao.UserDao;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    public User registerNewUser(User user) {
        return userDao.save(user);
    }

    public void initRoleAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Manager");
        adminRole.setRoleDescription("A manager of the restaurant.");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("Employee");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword("admin@pass");
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserName("emloyee123");
        user.setUserPassword("user@pass");
        user.setUserFirstName("emp");
        user.setUserLastName("emp");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);
    }
}
