require 'tk'

class Quest
  attr_accessor :description, :completed, :item_required, :location_required

  def initialize(description, item_required = nil, location_required = nil)
    @description = description
    @completed = false
    @item_required = item_required
    @location_required = location_required
  end

  def complete(player_inventory, current_room)
    puts "Current Room: #{current_room.name}"
    puts "Required Room: #{@location_required}"
    puts "Player Inventory: #{player_inventory}"
    puts "Required Items: #{@item_required}"
    
    if @item_required.nil? || (@item_required - player_inventory).empty?
      if @location_required.nil? || current_room.name == @location_required
        @completed = true
        "Quest completed: #{@description}"
      else
        "You need to be in the #{@location_required} to complete this quest."
      end
    else
      "You need the following items to complete the quest: #{@item_required.join(', ')}"
    end
  end

  def status
    @completed ? "Completed" : "Not completed"
  end
end

class Room
  attr_accessor :name, :description, :items, :exits, :characters, :quests

  def initialize(name, description)
    @name = name
    @description = description
    @items = []
    @exits = {}
    @characters = {}
    @quests = {}
  end

  def describe
    exit_descriptions = @exits.map do |direction, room|
      "#{direction.capitalize} to #{room.name}"
    end
    exit_text = exit_descriptions.empty? ? "None" : exit_descriptions.join(", ")
    
    character_text = @characters.empty? ? "None" : @characters.keys.join(", ")
    item_text = @items.empty? ? "None" : @items.join(", ")

    "You are in #{@name}. #{@description}\nCharacters: #{character_text}\nItems: #{item_text}\nExits: #{exit_text}"
  end
end

class Player
  attr_accessor :inventory, :current_room, :quests

  def initialize(starting_room)
    @inventory = []
    @current_room = starting_room
    @quests = {}
  end

  def move(direction)
    if @current_room.exits[direction]
      @current_room = @current_room.exits[direction]
      "You move #{direction}.\n" + @current_room.describe
    else
      "You can't go that way!"
    end
  end

  def take(item_name)
    item_name = item_name.downcase
    item = @current_room.items.find { |i| i.downcase == item_name }
    if item
      if item.downcase == "furnace"
        "You can't pick up the furnace."
      else
        @inventory << item
        @current_room.items.delete(item)
        "You picked up the #{item}."
      end
    else
      "There's no #{item_name} here."
    end
  end

  def talk_to(character_name)
    character_name = character_name.capitalize
    if @current_room.characters.key?(character_name)
      dialogue = @current_room.characters[character_name]
      quest = @current_room.quests[character_name]

      if quest
        quest_status = quest.complete(@inventory, @current_room)
        if @quests[quest.description] && @quests[quest.description].completed
          dialogue + "\nQuest Status: Already completed."
        else
          @quests[quest.description] = quest
          dialogue + "\nQuest: #{quest.description}\n" + quest_status
        end
      else
        dialogue
      end
    else
      "There's no one named #{character_name} here."
    end
  end

  def complete_quest(quest_description)
    puts "Checking quest: #{quest_description}"  
    if @quests[quest_description]
      puts "Quest found: #{@quests[quest_description]}"  
      @quests[quest_description].complete(@inventory, @current_room)
    else
      "You have not been given this quest."
    end
  end

  def inventory
    "You are carrying: " + (@inventory.empty? ? "nothing" : @inventory.join(", "))
  end
end

# rooms
command_center = Room.new("Command Center", "This is where you manage your missions.")
hall_way_1 = Room.new("Hallway", "It's a hallway.")
hall_way_2 = Room.new("Hallway", "It's a hallway.")
hall_way_3 = Room.new("Hallway", "It's a hallway.")
hall_way_4 = Room.new("Hallway", "It's a hallway.")
hall_way_5 = Room.new("Hallway", "It's a hallway.")
armory = Room.new("Armory", "A room to upgrade and customize your weapons.")
storm_shield = Room.new("Storm Shield", "The heart of your defense against the storm.")
lars_lab = Room.new("Lars's Lab", "A room full of lab equipment, van parts, and a guitar.")
van_room = Room.new("Lars's Van Parking", "Here is where Lars parks his's Van")
storage_room_1 = Room.new("Storage Room", "This room looks to be full of smashed llama bits.")
storage_room_2 = Room.new("Storage Room", "This is where Ray keeps all the SEE-Bots.")
power_room = Room.new("Power Room", "A room with a furnace for fueling the homebase.")
kevin_room = Room.new("Kevin's Room", "Kevin's workshop for upgrading homebase.")
bot_room = Room.new("The Bot's Room", "This is where Kevin, LoK & Pop spend there free time.")
major_room = Room.new("Major Oswald's Room", "The room where Oswald manages all the heros of homebase.")
sur_room = Room.new("The survivors bunk room", "A room with a bunch of beds and bunch of people.")
hero_room = Room.new("The heros bunk room", "A room with a bunch of beds and bunch of people.")
riggs_room = Room.new("Director Riggs Room", "The place where all the survivors go.")
medkit_room = Room.new("MedKit Storage Room", "The place you will find Ned.")

# room items
command_center.items << "mission briefing"
armory.items << "sword"
armory.items << "shotgun"
storm_shield.items << "shield battery"
storage_room_1.items << "Llama leg"
lars_lab.items << "Bluglo"
lars_lab.items << "Llama body"

# room characters
command_center.characters["Ray"] = "Ray says: 'Welcome to the Command Center! What can I help you with?'"
lars_lab.characters["Lars"] = "Lars says: 'I’m working on the van. We’ll need this to fly into the storm!'"
storage_room_1.characters["Llama"] = "Llama says: '........'"

# room quests
command_center.quests["Ray"] = Quest.new("Put Bluglo in the furnace in the Power Room", ["Bluglo"], "Power Room")
storage_room_1.quests["Llama"] = Quest.new("Find the missing llama parts")

# connecting rooms
command_center.exits["south"] = hall_way_1
hall_way_1.exits["north"] = command_center
hall_way_1.exits["east"] = armory
armory.exits["west"] = hall_way_1
hall_way_1.exits["west"] = storage_room_1
storage_room_1.exits["east"] = hall_way_1
hall_way_1.exits["south"] = hall_way_2
hall_way_2.exits["north"] = hall_way_1
hall_way_2.exits["east"] = lars_lab
lars_lab.exits["west"] = hall_way_2
lars_lab.exits["east"] = van_room
van_room.exits["west"] = lars_lab
hall_way_2.exits["south"] = power_room
power_room.exits["north"] = hall_way_2
hall_way_2.exits["west"] = hall_way_3
hall_way_3.exits["east"] = hall_way_2
hall_way_3.exits["north"] = kevin_room
kevin_room.exits["south"] = hall_way_3
kevin_room.exits["west"] = bot_room
bot_room.exits["east"] = kevin_room
hall_way_3.exits["south"] = major_room
major_room.exits["north"] = hall_way_3
major_room.exits["south"] = hero_room
hero_room.exits["north"] = major_room
hall_way_3.exits["west"] = hall_way_4
hall_way_4.exits["east"] = hall_way_3
hall_way_4.exits["south"] = storage_room_2
storage_room_2.exits["north"] = hall_way_4
hall_way_4.exits["north"] = riggs_room
riggs_room.exits["south"] = hall_way_4
riggs_room.exits["north"] = sur_room
sur_room.exits["south"] = riggs_room
sur_room.exits["north"] = medkit_room
medkit_room.exits["south"] = sur_room
hall_way_4.exits["west"] = hall_way_5

player = Player.new(command_center)

root = TkRoot.new { title "Homebase" }
root.minsize(500, 400)

game_output = TkText.new(root) {
  height 20
  width 60
  state 'disabled'
  grid('row' => 0, 'column' => 0, 'columnspan' => 2, 'sticky' => 'nsew')
}

def update_output(text_widget, message)
  text_widget.configure(state: 'normal')  
  text_widget.insert('end', message + "\n")
  text_widget.configure(state: 'disabled')  
  text_widget.see('end')  
end

input_field = TkEntry.new(root) {
  grid('row' => 1, 'column' => 0, 'sticky' => 'ew')
}

submit_button = TkButton.new(root) {
  text "Submit"
  grid('row' => 1, 'column' => 1)
}

update_output(game_output, player.current_room.describe)

submit_button.command = proc {
  input = input_field.get.downcase.split
  command = input[0]
  argument = input[1]

  result = case command
  when "move"
    player.move(argument)
  when "take"
    player.take(argument)
  when "inventory"
    player.inventory
  when "talk"
    player.talk_to(argument.capitalize)  
  when "quest"
    player.complete_quest(argument)
  when "quit"
    Tk.exit
  else
    "I don't understand that command."
  end

  update_output(game_output, result)
  input_field.delete(0, 'end')
}

Tk.mainloop
