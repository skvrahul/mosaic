import times from "lodash/times";
import React from "react";
import { GameTileType } from "../../game";
import { useBoardContext } from "./BoardContext";
import cn from "classnames";
import { TileEmptySlot, TileFull, TileTypeSlot } from "./Tile";

export const PlayerBoard = () => {
  const {
    State,
    playerID,
    selectedTiles,
    pickTiles,
    isActive
  } = useBoardContext();

  const playerBoard = State.players[playerID];

  return (
    <div>
      <div className={cn("PlayerBoard", isActive && "PlayerBoard--active")}>
        <span className="PlayerBoard__hint">
          {isActive ? "Make a move" : "Waiting..."}
        </span>
        <div className="PlayerBoard__left">
          {playerBoard.leftSlots.map((slot, slotIndex) => {
            return (
              <div
                className="TemporarySlot"
                key={slotIndex}
                onClick={() => {
                  if (selectedTiles) {
                    pickTiles(
                      selectedTiles?.tiles,
                      selectedTiles?.groupId,
                      slotIndex
                    );
                  }
                }}
              >
                {slot
                  .slice()
                  .reverse()
                  .map((tile, index) => {
                    return tile ? (
                      <TileFull
                        key={tile.id}
                        type={tile.type}
                        className="TemporarySlot__tile"
                      />
                    ) : (
                      <TileEmptySlot
                        key={`empty-tile-${index}`}
                        className="TemporarySlot__tile"
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>

        <div className="PlayerBoard__right">
          {playerBoard.rightSlots.map((slotRow, rowIndex) => {
            return (
              <div className="SlotRow" key={rowIndex}>
                {slotRow.map((slot, slotIndex) => {
                  const tileProps = {
                    type: slot.type,
                    key: `${rowIndex}-${slotIndex}`,
                    className: "SlotRow__tile"
                  };

                  return slot.tile ? (
                    <TileFull {...tileProps} />
                  ) : (
                    <TileTypeSlot {...tileProps} />
                  );
                })}
              </div>
            );
          })}
        </div>

        <div
          className="PlayerBoard__minus-points"
          onClick={() => {
            if (selectedTiles) {
              pickTiles(
                selectedTiles?.tiles,
                selectedTiles?.groupId,
                "minus-points"
              );
            }
          }}
        >
          {times(7, index => {
            const tile = playerBoard.minusPoints[index];

            if (tile === "begin-tile") {
              return (
                <TileFull
                  type={GameTileType.BEGIN}
                  className="TemporarySlot__tile"
                />
              );
            }

            return tile ? (
              <TileFull
                className="TemporarySlot__tile"
                type={tile.type}
                key={tile.id}
              />
            ) : (
              <TileEmptySlot
                key={`fill-${index}`}
                className="TemporarySlot__tile"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};