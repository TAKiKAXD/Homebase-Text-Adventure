require 'tk'
require 'json'

# Room class
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

# Quest class
class Quest
  attr_accessor :description, :completed, :item_required, :location_required

  def initialize(description, item_required = nil, location_required = nil)
    @description = description
    @completed = false
    @item_required = item_required || []
    @location_required = location_required
  end

  def complete(player_inventory, current_room)
    if (@item_required - player_inventory).empty? &&
       (@location_required.nil? || current_room.name == @location_required)
      @completed = true
      save_quest_completion
      "Quest completed: #{@description}"
    else
      required_items = @item_required.empty? ? '' : " You need the following items to complete the quest: #{@item_required.join(', ')}."
      required_location = @location_required.nil? ? '' : " You need to be in the #{@location_required} to complete this quest."
      required_items + required_location
    end
  end

  def save_quest_completion
    data = File.exist?("quests.json") ? JSON.parse(File.read("quests.json")) : {}
  
    data = {} unless data.is_a?(Hash)
  
    data[@description] = @completed
  
    File.open("quests.json", "w") do |file|
      file.write(JSON.pretty_generate(data))
    end
  end

  def status
    @completed ? "Completed" : "Not completed"
  end
end

# Player class
class Player
  attr_accessor :inventory, :current_room, :quests

  def initialize(starting_room)
    @inventory = []
    @current_room = starting_room
    @quests = {}
    load_inventory
    load_quests_from_file
  end

  def move(direction, game_output)
    if @current_room.exits[direction]
      @current_room = @current_room.exits[direction]
      update_output(game_output, "You move #{direction}.\n" + @current_room.describe)
    else
      update_output(game_output, "You can't go that way!")
    end
  end

  def take(item_name, game_output)
    item_name = item_name.strip
    item = @current_room.items.find { |i| i.downcase.strip == item_name.downcase }
    if item
      @inventory << item
      @current_room.items.delete(item)
      save_inventory
      update_output(game_output, "You picked up the #{item}.")
    else
      update_output(game_output, "There's no #{item_name} here.")
    end
  end
  
  def talk_to(character_name, game_output)
    character_name = character_name.capitalize
    if @current_room.characters.key?(character_name)
      dialogue = @current_room.characters[character_name]
      quest = @current_room.quests[character_name]

      if quest
        unless @quests.key?(quest.description)
          @quests[quest.description] = quest
          save_quests_to_file
        end

        quest_status = quest.complete(@inventory, @current_room)
        update_output(game_output, dialogue + "\nQuest: #{quest.description}\n" + quest_status)
      else
        update_output(game_output, dialogue)
      end
    else
      update_output(game_output, "There's no one named #{character_name} here.")
    end
  end

  def complete_quest(quest_description, game_output)
    if @quests[quest_description]
      update_output(game_output, @quests[quest_description].complete(@inventory, @current_room))
    else
      update_output(game_output, "You have not been given this quest.")
    end
  end

  def save_inventory
    File.open("player_inventory.json", "w") do |file|
      file.write(JSON.pretty_generate(@inventory))
    end
  end

  def load_inventory
    if File.exist?("player_inventory.json")
      @inventory = JSON.parse(File.read("player_inventory.json"))
    else
      @inventory = []
    end
  end

  def save_quests_to_file
    quests_data = @quests.map do |description, quest|
      {
        'description' => description,
        'completed' => quest.completed,
        'item_required' => quest.item_required,
        'location_required' => quest.location_required
      }
    end

    File.open('quests.json', 'w') do |file|
      file.write(JSON.pretty_generate(quests_data))
    end
  end

  def load_quests_from_file
    return unless File.exist?('quests.json')

    quests_data = JSON.parse(File.read('quests.json'))
    if quests_data.is_a?(Array)
      quests_data.each do |quest_data|
        if quest_data.is_a?(Hash)
          description = quest_data['description']
          completed = quest_data['completed']
          item_required = quest_data['item_required'] || []
          location_required = quest_data['location_required']

          quest = Quest.new(description, item_required, location_required)
          quest.completed = completed
          @quests[description] = quest
        end
      end
    else
      puts "Error: quests.json does not contain an array of quests"
    end
  end

  def inventory
    "You are carrying: " + (@inventory.empty? ? "nothing" : @inventory.join(", "))
  end
end

# Room definitions
command_center = Room.new("Command Center", "This is where you manage your missions.")
hall_way_1 = Room.new("Hallway", "It's a hallway.")
hall_way_2 = Room.new("Hallway", "It's a hallway.")
hall_way_3 = Room.new("Hallway", "It's a hallway.")
hall_way_4 = Room.new("Hallway", "It's a hallway.")
hall_way_5 = Room.new("Hallway", "It's a hallway.")
hall_way_6 = Room.new("Hallway", "It's a hallway.")
hall_way_7 = Room.new("Hallway", "It's a hallway.")
hall_way_big_1 = Room.new("Hallway", "It's big a hallway.")
armory = Room.new("Armory", "A room to upgrade and customize your weapons.")
storm_shield = Room.new("Storm Shield", "The heart of your defense against the storm.")
lars_lab = Room.new("Lars's Lab", "A room full of lab equipment, van parts, and a guitar.")
van_room = Room.new("Lars's Van Parking", "Here is where Lars parks his Van.")
storage_room_1 = Room.new("Storage Room", "This room looks to be full of smashed llama bits.")
storage_room_2 = Room.new("Storage Room", "This is where Ray keeps all the SEE-Bots.")
storage_room_3 = Room.new("Storage Room", "The room is full of mostly random stuff.")
power_room = Room.new("Power Room", "A room with a furnace for fueling the homebase.")
kevin_room = Room.new("Kevin's Room", "Kevin's workshop for upgrading homebase.")
bot_room = Room.new("The Bot's Room", "This is where Kevin, LoK & Pop spend their free time.")
major_room = Room.new("Major Oswald's Room", "The room where Oswald manages all the heroes of homebase.")
sur_room = Room.new("The survivors bunk room", "A room with a bunch of beds and a bunch of people.")
hero_room = Room.new("The heroes bunk room", "A room with a bunch of beds and a bunch of people.")
riggs_room = Room.new("Director Riggs Room", "The place where all the survivors go.")
medkit_room = Room.new("MedKit Storage Room", "The place you will find Ned.")
train_room = Room.new("Training Room", "A space for honing skills and preparing for battle.")
weaponstorage_room = Room.new("Weapon Storage Room", "A secure location for storing various weapons and explosive devices.")
hrle_room = Room.new("The Homebase Realistic Living Environment", "A simulated environment designed to mimic real-world living conditions.")
bluglo_storage_room = Room.new("Bluglo Storage Room", "A specialized room for storing all things Bluglo.")
resource_storage_room = Room.new("Resource Storage Room", "A room designated for storing various resource crates and storage bins.")

# Room items
command_center.items << "Mission Briefing"
command_center.items << "Communication Device"
hall_way_1.items << "Map of Homebase"
hall_way_2.items << "Lost Hat"
hall_way_3.items << "Sticky note"
hall_way_4.items << "Emergency Exit Sign"
hall_way_5.items << "Mysterious Package"
hall_way_7.items << "Floor Cleaning Supplies"
armory.items << "Sword"
armory.items << "Shotgun"
armory.items << "Ammo Box"
armory.items << "Grenade"
storm_shield.items << "Shield Battery"
storm_shield.items << "Storm Sensor"
lars_lab.items << "Bluglo"
lars_lab.items << "Lab Equipment"
lars_lab.items << "Van Parts"
lars_lab.items << "Guitar"
lars_lab.items << "Llama head"
van_room.items << "Van key"
van_room.items << "Spare Tire"
van_room.items << "Toolbox"
van_room.items << "Llama Tail"
storage_room_1.items << "Llama Leg"
storage_room_1.items << "Broken Llama Parts"
storage_room_2.items << "SEE-Bot Head"
storage_room_2.items << "Robot Parts"
storage_room_2.items << "Llama Torso"
storage_room_3.items << "Random Gadget"
storage_room_3.items << "Old Electronics"
storage_room_3.items << "Llama Foot"
power_room.items << "Fuel Canister"
kevin_room.items << "Tool Kit"
bot_room.items << "Bot Maintenance Tools"
bot_room.items << "Rlayful Robot Parts"
major_room.items << "Hero Dossiers"
major_room.items << "Tactical Map"
sur_room.items << "Bedroll"
sur_room.items << "Survivor Gear"
hero_room.items << "Hero Costume"
hero_room.items << "Training Gear"
riggs_room.items << "Survivor Reports"
riggs_room.items << "Emergency Supplies"
medkit_room.items << "Medkit"
medkit_room.items << "First Fid Supplies"
train_room.items << "Training Dummies"
weaponstorage_room.items << "Rifle"
weaponstorage_room.items << "Explosive Device"
hrle_room.items << "Living Supplies"
bluglo_storage_room.items << "Bluglo Containers"
bluglo_storage_room.items << "Bluglo Samples"
resource_storage_room.items << "Resource Crates"
resource_storage_room.items << "Storage Bins"

# Room characters
command_center.characters["Ray"] = "Ray says: 'Welcome to the Command Center! What can I help you with?'"
storage_room_1.characters["Llama"] = "Llama says: '........'"
armory.characters["Clip"] = "Clip says: ''"
lars_lab.characters["Lars"] = "Lars says: 'I’m working on the van. We’ll need this to fly into the storm!'"
lars_lab.characters["Anthony"] = "Anthony says: ''"
lars_lab.characters["Syd"] = "Syd says: ''"
lars_lab.characters["Carlos"] = "Carlos says: ''"
kevin_room.characters["Kevin"] = "Kevin says: ''"
bot_room.characters["LoK"] = "LoK says: ''"
bot_room.characters["Pop"] = "Pop says: ''"
major_room.characters["Oswald"] = "Major Oswald says: ''"
hero_room.characters["Penny"] = "Penny says: ''"
hero_room.characters["Ken"] = "Ken says: ''"
hero_room.characters["Jess"] = "Jess says: ''"
storage_room_2.characters["SEE-Bot"] = "SEE-Bot says: 'QUIET PLEASE. I AM SEEING. I AM SEEING'"
storage_room_2.characters["Pira-SEE-Bot"] = "Pira-SEE-Bot says: 'AVAST YE SCURVY LANDLUBBERS. I BE A SEEIN'.'"
riggs_room.characters["Riggs"] = "Director Riggs says: ''"
sur_room.characters["Survivor1"] = "Survivor says: 'You’re a lifesaver, Commander. We’d be toast without you!'"
sur_room.characters["Survivor2"] = "Survivor says: 'One day, we’ll take back our world from this storm. I just know it!'"
sur_room.characters["Survivor3"] = "Survivor says: 'Think we’ll ever see blue skies again, Commander? I miss the sun...'"
medkit_room.characters["Ned"] = "Ned says: 'Any chance you’ve got a Medkit?'"
hrle_room.characters["Ramirez"] = "Ramirez says: ''"
hrle_room.characters["Eminem"] = "Eminem says: ''"

# Room quests
#command_center.quests["Ray"] = Quest.new("Put Bluglo in the furnace in the Power Room", ["Bluglo"], "Power Room")

# Connecting rooms
command_center.exits["south"] = hall_way_1
hall_way_1.exits["north"] = command_center
hall_way_1.exits["east"] = armory
armory.exits["west"] = hall_way_1
armory.exits["east"] = weaponstorage_room
weaponstorage_room.exits["west"] = armory
hall_way_1.exits["west"] = storage_room_1
storage_room_1.exits["east"] = hall_way_1
hall_way_1.exits["south"] = hall_way_2
hall_way_2.exits["north"] = hall_way_1
hall_way_2.exits["east"] = lars_lab
lars_lab.exits["west"] = hall_way_2
lars_lab.exits["east"] = van_room
van_room.exits["west"] = lars_lab
van_room.exits["south"] = power_room
power_room.exits["north"] = van_room
hall_way_2.exits["south"] = train_room
train_room.exits["north"] = hall_way_2
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
storage_room_2.exits["west"] = hall_way_7
hall_way_4.exits["north"] = riggs_room
riggs_room.exits["south"] = hall_way_4
riggs_room.exits["north"] = sur_room
sur_room.exits["south"] = riggs_room
sur_room.exits["north"] = medkit_room
sur_room.exits["west"] = storage_room_3
medkit_room.exits["south"] = sur_room
medkit_room.exits["west"] = hall_way_big_1
hall_way_big_1.exits["east"] = medkit_room
bluglo_storage_room.exits["east"] = hall_way_big_1
bluglo_storage_room.exits["south"] = hall_way_6
hall_way_big_1.exits["west"] = bluglo_storage_room
hall_way_big_1.exits["south"] = resource_storage_room
resource_storage_room.exits["north"] = hall_way_big_1
hall_way_4.exits["west"] = hall_way_5
hall_way_5.exits["east"] = hall_way_4
hall_way_5.exits["north"] = hrle_room
hrle_room.exits["south"] = hall_way_5
hrle_room.exits["east"] = storage_room_3
storage_room_3.exits["west"] = hrle_room
storage_room_3.exits["east"] = sur_room
hall_way_5.exits["west"] = hall_way_6
hall_way_5.exits["south"] = hall_way_7
hall_way_7.exits["north"] = hall_way_5
hall_way_7.exits["east"] = storage_room_2
hall_way_6.exits["east"] = hall_way_5
hall_way_6.exits["north"] = bluglo_storage_room
hall_way_6.exits["west"] = storm_shield
storm_shield.exits["east"] = hall_way_6

player = Player.new(command_center)

root = TkRoot.new { title "Homebase Adventure" }
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
rescue => e
  puts "Error in update_output: #{e.message}"
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
  input = input_field.get
  command, *argument_parts = input.split
  argument = argument_parts.join(' ')

  result = case command.downcase
  when "move"
    player.move(argument.downcase, game_output)
  when "take"
    player.take(argument, game_output)
  when "inventory"
    player.inventory
  when "talk"
    player.talk_to(argument.capitalize, game_output)
  when "quest"
    player.complete_quest(argument, game_output)
  when "quit"
    Tk.exit
  else
    "I don't understand that command."
  end

  update_output(game_output, result)
  input_field.delete(0, 'end')
}


Tk.mainloop