package com.example.backend;

import com.example.backend.data.entities.Color;
import com.example.backend.data.repository.ColorRepository;
import com.example.backend.message.ColorsUpdateMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;


import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ColorController {

    private final ColorRepository colorRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public ColorController(ColorRepository colorRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.colorRepository = colorRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    @PutMapping("/vote")
    public ResponseEntity<Optional<Color>> vote(@RequestParam Integer id) {
        var color = colorRepository.findById(id);

        if(color.isEmpty())
            return ResponseEntity.notFound().build();

        colorRepository.save(color.get().incrementVotes());

        this.send(ColorsUpdateMessage.updated(color));

        return ResponseEntity.ok(color);
    }

    @GetMapping("/list")
    public Iterable<Color> getColors() {
        return colorRepository.findAll();
    }

    private void send(ColorsUpdateMessage message) {
        this.simpMessagingTemplate.convertAndSend("/topic/colors", message);
    }
}