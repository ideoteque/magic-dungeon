# 📜 GAME DESIGN DOCUMENT (GDD) MASTER — MAGIC DUNGEON

**Document Version:** 1.0 (Final Architecture & Mechanics Lock)

**Project Codename:** *Magic Dungeon*

**Primary Language:** English

**Game Type:** Party Dungeon-Racing / Board-Movement Game

**Target File Standard:** Master Specification for AI Agents & Game Developers

## 1. GAME OVERVIEW & DESIGN PILLARS

* **Players:** 2 to 4 Players (Scalable up to 6)

* **Playtime:** 30–45 minutes total (4 Incursions / Rounds of \~8–10 minutes each)

* **Target Audience:** Casual board gamers, families, and tabletop/RPG fans seeking a fast-paced, high-interaction, chaotic race game.

* **Core Pillars:**

  1. **Instant Accessibility:** Simple *roll-and-move* base mechanic (1d6) — zero entry barrier.

  2. **Emergent Chaos:** Simple track geometry where complexity arises entirely from game-breaking Hero abilities, Consumables, and Global Events.

  3. **Roguelike Progression:** Escalating danger across 4 levels with specialized level-tier decks.

  4. **High Replayability:** Over 60%–75% of cards remain unrevealed in any single session.

## 2. PHYSICAL COMPONENTS & SPECS

* **2x Double-Sided Game Boards (4 Dungeon Levels total):**

  * **Level 1 (Board 1, Side A):** *The Catacombs* (30 Spaces)

  * **Level 2 (Board 1, Side B):** *The Maze* (30 Spaces)

  * **Level 3 (Board 2, Side A):** *The Dungeons* (30 Spaces)

  * **Level 4 (Board 2, Side B):** *The Dragon's Lair* (30 Spaces)

* **20x Hero Cards & Standees** (Poker Size: 63x88mm)

* **52x Chest Consumable Cards (📦):** Poker Size (63x88mm), split into 4 Level Decks (13 cards per level).

* **36x Altar Global Event Cards (⛩️):** Poker Size (63x88mm), split into 4 Level Decks (9 cards per level).

* **Dice Component:**

  * 4x 1d6 (Movement Dice — 1 per player)

  * 1x 1d20 (Neutral Master Die — Altar Tests & Duels)

* **Trophy Point Tokens (Victory Stash):**

  * 🥇 **Gold (1st Place):** Escalating value per level (3, 4, 5, 6 Pts)

  * 🥈 **Silver (2nd Place):** Escalating value per level (1, 2, 2, 3 Pts)

  * 🥉 **Bronze (Bonus/Events):** 1 Pt each

## 3. CAMPAIGN STRUCTURE & DRAFTING

### Phase 1: Initial Snake Draft

1. Reveal Hero cards face-up in the table center (8 cards for 2p, 12 for 3p, 16 for 4p, or all 20 for 4–5p).

2. Players roll 1d6; highest roll picks first.

3. Execute a **Snake Draft** (P1 ➔ P2 ➔ P3 ➔ P4 ➔ P4 ➔ P3 ➔ P2 ➔ P1) until each player has **4 Hero Cards in hand**.

### Phase 2: The 4 Incursions

The campaign plays through the 4 dungeon boards in sequential order. At the start of each level, players **secretly choose 1 Hero** from their hand and reveal simultaneously. Each Hero can be used **only once** per campaign.

```
┌──────────────┬──────────────────────────────┬──────────────────────────┐
│ INCURSION    │ PHYSICAL BOARD               │ VICTORY REWARD           │
├──────────────┼──────────────────────────────┼──────────────────────────┤
│ 💀 Level 1   │ Board 1 - Side A             │ 🥇 3 Pts  |  🥈 1 Pt     │
│              │ (The Catacombs)              │                          │
│ 🌿 Level 2   │ Board 1 - Side B             │ 🥇 4 Pts  |  🥈 2 Pts    │
│              │ (The Maze)                   │                          │
│ ⛓️ Level 3   │ Board 2 - Side A             │ 🥇 5 Pts  |  🥈 2 Pts    │
│              │ (The Dungeons)               │                          │
│ 🐉 Level 4   │ Board 2 - Side B             │ 🥇 6 Pts  |  🥈 3 Pts    │
│              │ (The Dragon's Lair)          │                          │
└──────────────┴──────────────────────────────┴──────────────────────────┘


```

## 4. CORE RULES, TURN FLOW & STATE CHECKS

### Turn Sequence

1. **\[Optional\]** Play a Chest Consumable Card (Action).

2. **Main Move:** Roll 1d6 and move your hero token forward.

3. **Trigger Resolution:** Resolve character powers or opponent reactions triggered by movement.

4. **Landing Space Efficacy:** Resolve space effects (Chest 📦, Altar ⛩️, Traps, Hazards).

5. **\[Optional\]** Play a Chest Consumable Card (Action).

### The Tripped (Stunned) Status

* If a power, trap, or hazard **Trips** a hero, lay their standee face-down.

* On their next turn, the hero **does NOT roll their die for main movement**.

* **CRITICAL STATE RULE:** Passive abilities and triggers remain 100% ACTIVE while Tripped! Other players can still push, pull, or swap with a Tripped hero. Stand the hero upright at the end of their skipped turn.

### Strict Reaction Priority (Trigger Order)

When multiple effects trigger simultaneously:

1. **1st:** Board Space Effects (Traps, Hazards, Landings)

2. **2nd:** Active Player's Powers (Current turn player)

3. **3rd:** Passive Players' Powers (In clockwise turn order)

## 5. BOARD TRACK GEOMETRY (30 SPACES PER LEVEL)

```
LEVEL 1: THE CATACOMBS
[00] START | [03] CHEST 📦 | [08] SPIKES 🪤 | [12] ALTAR ⛩️ | [18] CHEST 📦 | [22] SPIKES 🪤 | [26] CHEST 📦 | [30] FINISH 🏁

LEVEL 2: THE MAZE
[00] START | [04] CHEST 📦 | [09] SLIPPERY MOSS 🌊 | [13] ALTAR ⛩️ | [17] BOTTLENECK 🚧 | [21] CHEST 📦 | [25] BANANA TRAP 🪤 | [30] FINISH 🏁

LEVEL 3: THE DUNGEONS
[00] START | [05] CHEST 📦 | [09] PITFALL 🕳️ | [12] ALTAR 1 ⛩️ | [16] CHAINS ⛓️ | [20] CHEST 📦 | [23] ALTAR 2 ⛩️ | [27] ANCHOR ⚓ | [30] FINISH 🏁

LEVEL 4: THE DRAGON'S LAIR
[00] START | [04] CHEST 📦 | [08] ALTAR 1 ⛩️ | [12] MOLTEN LAVA 🔥 | [17] CHEST 📦 | [21] BLADE ⚔️ | [24] ALTAR 2 ⛩️ | [27] DRAGON ROAR 🐲 | [30] FINISH 🏆


```

* **Board Space Mechanics:**

  * **Spikes / Blades / Anchors:** Recede indicated spaces immediately.

  * **Slippery Moss / Bottleneck:** Pass/land costs +1 movement point or restricts occupancy to 1 hero.

  * **Pitfall / Chains / Lava:** Recede spaces and gain **Tripped** status.

  * **Finish Line:** Reaching space 30 requires an **exact die roll**.

## 6. THE 20 HERO ROSTER & BALANCE CHECK

*(All abilities text-constrained for single-line titles and max 2–3 text lines per card layout).*

### ⚔️ THE FIGHTERS (5)

1. **GROK** — *Red Lantern Berserker*

   *Ability (Red Lantern Fury):* While in last place, get **+3 to your roll**. Passing another hero pushes them back 1 space.

2. **SIR GALHAD** — *Radiant Paladin*

   *Ability (Aura of Justice):* No hero can pass you within 2 spaces. Any hero attempting to pass must stop on the space behind you.

3. **THORIN BREWBURN** — *Tavern Brawler*

   *Ability (Tavern Slam):* Stopping on another hero's space knocks them back 3 spaces and **Trips** them.

4. **CHIRON** — *Wild Centaur*

   *Ability (Hoofstrike):* Passing a hero during your main move kicks them back 2 spaces.

5. **GRONK** — *Living Monolith*

   *Ability (Immovable Object):* No one can stop on your space. If a hero lands on you, move them back 1 space.

### 🧙‍♂️ THE SPELLCASTERS (5)

 6. **OLARIN** — *Grey Wizard* \[Homage: Gandalf\]

    *Ability (Blundered Teleport):* Rolling a **1** triggers no move. Instead, swap spaces with the hero in 1st place.

 7. **MASTER YOD-AH** — *Grand Mystic* \[Homage: Yoda\]

    *Ability (Force Inversion):* After rolling, you may flip your die to its opposite side ($1 \leftrightarrow 6$, $2 \leftrightarrow 5$, $3 \leftrightarrow 4$).

 8. **WARP** — *Dimensional Shifter*

    *Ability (Phase Shift):* Skip rolling your die to swap spaces with any hero on the board.

 9. **VESPERA** — *Plague Necromancer*

    *Ability (Grave Embrace):* Whenever forced backwards, drag any hero within 3 spaces back the same amount with you.

10. **IGNIS** — *Chaos Sorcerer*

    *Ability (Wildfire Surge):* You may double your roll. If you do, you **Trip** at the end of your move.

### 🗡️ THE ROGUES (5)

11. **THORIN GREEDFOOT** — *Dwarf Taxman*

    *Ability (Dungeon Toll):* +2 to roll if last. Passing a hero steals 1 Trophy Point from their stash.

12. **SLINK** — *Guild Rogue*

    *Ability (Slipstream):* Passing over a hero steals 1 move point (they step back 1, you move +1).

13. **MORDER** — *Chest Mimic* \[Homage: D&D Mimic\]

    *Ability (Living Trap):* Landing on a space with exactly 1 hero devours them: push them back 5 spaces and **Trip** them.

14. **GNAT** — *Goblin Parasite*

    *Ability (Piggyback):* Whenever another hero on your space moves, ride along to their destination.

15. **CRACKLES** — *Skittering Skeleton*

    *Ability (Bone Leap):* Skip occupied spaces without counting them toward your movement.

### 🎭 SUPPORTS & POP CULTURE HOMAGES (5)

16. **INIGO** — *Avenging Fencer* \[Homage: Inigo Montoya\]

    *Ability (Duel!):* Sharing a space lets you call a DUEL! Both roll 1d20; highest moves 2 spaces. (Wins ties).

17. **BOBA** — *Relentless Tracker* \[Homage: Boba Fett\]

    *Ability (Grappling Hook):* At start of turn, pull the lead hero back 2 spaces toward you.

18. **PIXIE** — *Luminous Sprite* 

    $$
    Homage: Navi / Zelda
    $$

    *Ability (Magic Siphon):* Move 1 space whenever another power triggers. If you pass that caster, gain +1 to your next roll.

19. **THE ORACLE** — *Prophet of Doom*

    *Ability (Prophecy of Sacrifice):* Secretly choose a hero. If they win 1st, you claim 1st place points. You may donate your turn's roll to them.

20. **PIP** — *Scandalous Bard*

    *Ability (Disruption Solo):* Rolling a **6** lets you skip move to force all rivals to roll 1d6. Odd rolls lose their next turn.

## 7. CHEST CONSUMABLE DECKS (52 CARDS)

*(Hand Limit: Max 2 cards per player. Instant Action or Reaction timing).*

### Level 1 Deck — Catacombs (13 Cards)

* **Speed Potion (Action x4):** +2 to your roll this turn.

* **Small Shield (Reaction x4):** Cancel 1 trap or hero attack targeting you.

* **Torchlight (Action x5):** Draw 1 extra Chest card, keep 1, discard the other.

### Level 2 Deck — Maze (13 Cards)

* **Slick Oil (Action x4):** Place on a space. Next hero stepping there slides +2 spaces forward.

* **Banana Peel (Action x5):** Place on a space. First hero passing recedes 2 spaces.

* **Illusory Wall (Action x4):** Block a space. No hero can pass until next turn.

### Level 3 Deck — Dungeons (13 Cards)

* **Prison Chains (Action x4):** Choose a hero within 3 spaces: **Trip** them.

* **Force Scroll (Action x5):** Push any hero within 2 spaces back 3 spaces.

* **Cursed Chest (Action x4):** Draw 2 Chest cards, but recede 2 spaces immediately.

### Level 4 Deck — Dragon Lair (13 Cards)

* **Warp Pearl (Action x4):** Swap spaces with the 1st place hero.

* **Fire Wave (Action x5):** All heroes within 3 spaces recede 3 spaces.

* **Dragon Sacrifice (Action x4):** Recede 2 spaces to force ALL other heroes back 4 spaces.

## 8. ALTAR GLOBAL EVENT DECKS (36 CARDS)

### 💀 LEVEL 1: CATACOMBS (9 CARDS)

1. **Ancient Blessing (Direct ⚡ x2):** Last place hero moves forward 3 spaces.

2. **Shared Loot (Direct ⚡ x2):** All heroes draw 1 Level 1 Chest card.

3. **Hasty Mists (Ongoing ⌛ x1):** Until end of level, rolling a 1 lets you move 2 spaces instead of 1.

4. **Mystic Altar (d20 Test 🎲 x2):**

   * `1`: *Rejected.* Recede 2 spaces.

   * `2–9`: *Silent.* No effect.

   * `10–18`: *Favored.* Advance 2 spaces.

   * `19–20`: *Blessed.* Advance 3 spaces & draw 1 Chest card.

5. **Catacomb Echoes (d20 Test 🎲 x2):**

   * `1`: All heroes recede 2 spaces.

   * `2–9`: 1st place hero recedes 1 space.

   * `10–18`: All heroes advance 1 space.

   * `19–20`: Last place hero advances 4 spaces.

### 🌿 LEVEL 2: MAZE (9 CARDS)

1. **Root Quake (Direct ⚡ x2):** Roots burst! All heroes recede 2 spaces.

2. **Gust of Wind (Direct ⚡ x1):** Lead hero pushed back 3 spaces; last place hero advances 3 spaces.

3. **Slippery Moss (Ongoing ⌛ x2):** Until end of level, even-numbered spaces cost +1 move.

4. **Forest Taunt (d20 Test 🎲 x2):**

   * `1`: *Entangled.* Recede 3 spaces and **Trip**.

   * `2–9`: Quake with no effect.

   * `10–18`: *Gale.* Advance 2 spaces.

   * `19–20`: *Shortcut.* Jump directly in front of closest hero.

5. **Cave-In (d20 Test 🎲 x2):**

   * `1`: Roof falls! All heroes in front half recede 3 spaces.

   * `2–9`: Altar space becomes blocked.

   * `10–18`: Path clears: advance 2 spaces.

   * `19–20`: *Rubble Launch.* Push any hero back 3 spaces.

### ⛓️ LEVEL 3: DUNGEONS (9 CARDS)

1. **Public Execution (Direct ⚡ x2):** 1st place hero recedes 4 spaces and discards all Chest cards.

2. **Shadow Theft (Direct ⚡ x1):** All players pass 1 Chest card to the player on their left.

3. **Arcane Silence (Ongoing ⌛ x2):** Until end of level, Reaction/Defense cards cannot be played.

4. **Gaoler's Trial (d20 Test 🎲 x2):**

   * `1`: *Max Sentence.* Go to nearest Trap space behind you.

   * `2–9`: *Shackled.* **Trip** for next turn.

   * `10–18`: *Breakout.* Advance 3 spaces.

   * `19–20`: *Full Pardon.* Advance 4 spaces & gain 1 Trophy Point.

5. **Shadow Ritual (d20 Test 🎲 x2):**

   * `1`: *Failed Pact.* Lose 1 Trophy Point from stash.

   * `2–9`: *Curse.* All heroes recede 1 space.

   * `10–18`: *Drain.* Pull hero ahead of you back 2 spaces.

   * `19–20`: *Dark Pact.* Swap spaces with 1st place; both **Trip**.

### 🐉 LEVEL 4: DRAGON LAIR (9 CARDS)

1. **Dragon Swap (Direct ⚡ x2):** Last place hero swaps spaces with 2nd place hero.

2. **Molten Gold (Direct ⚡ x1):** 1st place hero loses 2 Trophy Points, but moves +2 spaces.

3. **The Dragon Awakes (Ongoing ⌛ x2):** Until end of level, after every full round, lead hero recedes 2 spaces.

4. **Dragon's Breath (d20 Test 🎲 x2):**

   * `1`: *Cataclysm!* Dragon breathes fire. All heroes recede 3 spaces & **Trip**.

   * `2–9`: Partial breath: 1st place hero recedes 2 spaces.

   * `10–18`: Dragon rumbles: no effect.

   * `19–20`: *Dragon Shield.* Immune to traps & advance 3 spaces.

5. **Volcanic Fury (d20 Test 🎲 x2):**

   * `1`: *Eruption!* Caster recedes 4 spaces & loses next turn.

   * `2–9`: Burning floor: Heroes on odd spaces recede 2 spaces.

   * `10–18`: *Ash Wind.* Last place hero advances 4 spaces.

   * `19–20`: *Phoenix Flight.* Warp behind leader & take an extra turn.

## 9. GAME BALANCE & META EVALUATION SUMMARY

1. **Top-Tier S-Class Alignment:** The Top 3 Hero abilities (**Pixie**, **Olarin**, **The Oracle**) match the competitive Meta thresholds of classic games like *Magical Athlete* (Scoocher, Flip Flop, Legs).

2. **Self-Balancing Snake Draft:** S-Tier heroes are draftable priorities. Picking a game-breaking hero early forces a player to pick last in the subsequent round.

3. **Catch-Up Mechanisms:** Multiple heroes (**Grok**, **Thorin Greedfoot**) gain passive movement buffs or steals when in last place, preventing early blowouts.

4. **Anti-Runaway Leader Cards:** High-level Altar and Chest cards specifically target 1st-place heroes (**Public Execution**, **Dragon Awakes**, **Boba**), maintaining tight finishes across all 4 incursions.

## 10. END OF GAME & WIN CONDITION

An Incursion ends instantly when 2 heroes cross space 30 (exact roll required).

At the end of Level 4 (*The Dragon's Lair*), players tally all accumulated Trophy Points. **The player with the highest overall Trophy Point count wins the game!**