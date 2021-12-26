package com.example.Final_Project.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Final_Project.Role.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;




    @Autowired
    public UserService(UserRepository userRepository, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUser_name(username);
        if(user  == null){
            throw new UsernameNotFoundException("User not found in the database");
        }


        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUser_name(), user.getPassword(), authorities);
    }



    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String id){
        int user_id = Integer.valueOf(id);
        return userRepository.findById(user_id).orElse(null);
    }



    public ResponseEntity<String> addUser(User user){

        String regex = "^[a-zA-Z0-9._-]{3,}$";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(user.getUser_name());
        if(! m.matches()){
            return ResponseEntity.ok().body("Username is incorrect");
        }

        regex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
         p = Pattern.compile(regex);
         m = p.matcher(user.getEmail());
        if(! m.matches()){
            return ResponseEntity.ok().body("Email is incorrect");
        }

        regex = "^(009665|9665|\\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$";
        p = Pattern.compile(regex);
        m = p.matcher(user.getPhone());
        if(! m.matches()){
            return ResponseEntity.ok().body("Phone is incorrect");
        }

        regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
        p = Pattern.compile(regex);
        m = p.matcher(user.getPassword());
        if(! m.matches()){
            return ResponseEntity.ok().body("Password is incorrect");
        }

        if(userRepository.findByUser_name(user.getUser_name()) != null){
            return ResponseEntity.ok().body("Username already exists");
        }

        if(userRepository.findByEmail(user.getEmail()) != null){
            return ResponseEntity.ok().body("Email already exists");
        }


        Role role = roleRepo.findById(Long.valueOf(2)).orElse(null);
        user.getRoles().add(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setImg("https://res.cloudinary.com/dtqxphvwc/image/upload/v1640244759/jeykewbu/ghuemwc7266ws0a2mgql.png");

        userRepository.save(user);
        return ResponseEntity.ok().body("ok");
    }




    public void deleteUser(String id){
        int user_id = Integer.valueOf(id);
        userRepository.deleteById(user_id);

    }

    public ResponseEntity<String> updateUser(String id, User data) {
        int user_id = Integer.valueOf(id);
        User user = userRepository.findById(user_id).orElse(null);


        if(data.getBalance() > 0 ){
            user.setBalance(data.getBalance());
        }
        else {


            String regex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
            Pattern p = Pattern.compile(regex);
            Matcher m = p.matcher(data.getEmail());
            if(data.getEmail().equals("") ||  (data.getEmail() == null)){
                data.setEmail(user.getEmail());
            }
            else if(! m.matches()) {
                return ResponseEntity.ok().body("Email is incorrect");
            }

            regex = "^(009665|9665|\\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$";
            p = Pattern.compile(regex);
            m = p.matcher(data.getPhone());
            if(data.getPhone().equals("") ||  (data.getPhone() == null)){
                data.setPhone(user.getPhone());
            }
            else  if (! m.matches()){
                return ResponseEntity.ok().body("Phone is incorrect");
            }

            regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
            p = Pattern.compile(regex);
            m = p.matcher(data.getPassword());
            if(data.getPassword().equals("") ||  (data.getPassword() == null)){
                data.setPassword(user.getPassword());
            }
            else if(! m.matches()) {
                return ResponseEntity.ok().body("Password is incorrect");
            }

            if (userRepository.findByEmail(data.getEmail()).getUser_id() != data.getUser_id()) {
                return ResponseEntity.ok().body("Email already exists");
            }

            if (! data.getImg().equals("")){
                user.setImg(data.getImg());
            }

            user.setUser_name(data.getUser_name());
            user.setBalance(data.getBalance());
            user.setEmail(data.getEmail());
            user.setPhone(data.getPhone());
            user.setPassword(passwordEncoder.encode(data.getPassword()));
        }
            userRepository.save(user);

    return ResponseEntity.ok().body("ok");   }
}





