package com.example.adspage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AdsPageApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdsPageApplication.class, args);
    }

}
