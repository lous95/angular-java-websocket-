package com.example.backend.message;

import com.example.backend.data.entities.Color;

import java.util.Optional;

public class ColorsUpdateMessage {
    private final Optional<Color> updatedEntity;

    private ColorsUpdateMessage(Optional<Color> updatedEntity) {
        this.updatedEntity = updatedEntity;
    }

    public static ColorsUpdateMessage updated(final Optional<Color> entity) {
        return new ColorsUpdateMessage(entity);
    }

    public Optional<Color> getUpdatedEntity() {
        return updatedEntity;
    }
}


