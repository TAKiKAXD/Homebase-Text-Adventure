const homebaseDisk = () => ({
  roomId: 'commandcenter', 
  rooms: [
    {
      id: 'commandcenter', 
      name: 'Command Center', 
      desc: `This is where you manage your missions into the storm.`, 
      items: [
        {
          name: 'Mission Briefing',
          desc: 'A detailed overview of upcoming missions.', 
          onUse: () => println(`The Mission Briefing shows details about a mission you have never seen before.`), 
        },
        {
          name: 'Communication Device',
          desc: 'A device used to communicate with other team members.', 
          onUse: () => println(`It doesn’t look like it works.`), 
        },
      ],
      exits: [
        {
          dir: 'south', 
          id: 'hallway1',
        },
      ],
    },
    {
      id: 'storageroom1', 
      name: 'Llama Storage Room', 
      desc: `This room looks to be full of smashed llama bits, remnants of previous expeditions.`, 
      items: [
        {
          name: 'Smashed Head',
          desc: 'An old X-Ray of a llama’s head, a relic from the past.', 
          onUse: () => println(`The old llama head stares back at you.`), 
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const head = getItem('Llama Head');
            head.desc = head.desc.slice(0, head.desc.indexOf('\n'));
          }
        },
        {
          name: 'Broken Parts',
          desc: 'A collection of llama parts, mostly tails and legs, left behind.', 
          onUse: () => println(`It’s a bunch of llama parts from various llamas.`), 
        },
      ],
      exits: [
        {
          dir: 'east', 
          id: 'hallway1',
        },
      ],
    },
    {
      id: 'armory', 
      name: 'Armory', 
      desc: `A room to upgrade and customize your weapons.`, 
      items: [
        {
          name: 'Sword',
          desc: 'An old sword, likely used in past battles.', 
          onUse: () => println(`The sword looks to be made from an old ruler.`), 
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const sword = getItem('Sword');
            sword.desc = sword.desc.slice(0, sword.desc.indexOf('\n'));
          }
        },
        {
          name: 'Shotgun',
          desc: 'A well-worn shotgun, ready for action.', 
          onUse: () => println(`You inspect the shotgun, it seems to be functional.`), 
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const sgun = getItem('Shotgun');
            sgun.desc = sgun.desc.slice(0, sgun.desc.indexOf('\n'));
          }
        },
        {
          name: 'Ammo Box',
          desc: 'A box filled with various types of ammunition.', 
          onUse: () => println(`You shake the box and hear the ammo rattle inside.`), 
        },
      ],
      exits: [
        {
          dir: 'west', 
          id: 'hallway1',
        },
        {
          dir: 'east', 
          id: 'weaponstorageroom',
        },
      ],
    },
    {
      id: 'weaponstorageroom',
      name: 'Weapon Storage Room',
      desc: `This dimly lit room is lined with shelves and racks, all filled with various weapons and gear. The faint smell of metal and oil lingers in the air, a testament to the countless battles fought with these very items. Each weapon has its own story, waiting to be discovered.`,
      items: [
        {
          name: 'Combat Knife',
          desc: 'A sharp and reliable knife, perfect for close encounters.', 
          onUse: () => println(`You wield the combat knife, feeling its weight in your hand.`),
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const knife = getItem('Combat Knife');
            knife.desc = knife.desc.slice(0, knife.desc.indexOf('\n'));
          }
        },
        {
          name: 'Rifle',
          desc: 'A sturdy rifle with good range and stopping power.', 
          onUse: () => println(`You inspect the rifle, ensuring it’s ready for action.`),
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const rifle = getItem('Rifle');
            rifle.desc = rifle.desc.slice(0, rifle.desc.indexOf('\n'));
          }
        },
        {
          name: 'Grenade',
          desc: 'An explosive device that can clear out groups of enemies.', 
          onUse: () => println(`You hold the grenade tightly, knowing it can turn the tide of battle.`),
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const grenade = getItem('Grenade');
            grenade.desc = grenade.desc.slice(0, grenade.desc.indexOf('\n'));
          }
        },
      ],
      exits: [
        {
          dir: 'west',
          id: 'armory',
        },
      ],
    },    
    {
      id: 'hallway1',
      name: 'Hallway',
      desc: `It’s a dimly lit hallway. To the west is a **STORAGE ROOM**, and to the east is the **ARMORY**.`,
      items: [
        {
          name: 'Map of Homebase',
          desc: 'A hand-drawn map of Homebase, complete with various annotations.', 
          onUse: () => println(`It's a poorly drawn map of Homebase, looks like Denis was the one who made it.`),
          isTakeable: true,
          onTake() {
            println(`You took it.`);  
            const map = getItem('Map');
            map.desc = map.desc.slice(0, map.desc.indexOf('\n'));
          }
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'commandcenter',
        },
        {
          dir: 'east',
          id: 'armory',
        },
        {
          dir: 'south',
          id: 'hallway2',
        },
        {
          dir: 'west',
          id: 'storageroom1',
        },
      ],
    },
    {
      id: 'hallway2',
      name: 'Hallway',
      desc: `It’s a dimly lit hallway. To the south is the **TRAINING ROOM**, and to the east is **LARS'S LAB**.`,
      items: [
        {
          name: 'Sticky Note',
          desc: 'A sticky note with writing on it.', 
          onUse: () => println(`It's a sticky note that says, "Denis, please give me my drumsticks back - Anthony."`),
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'hallway1',
        },
        {
          dir: 'east',
          id: 'larslab',
        },
        {
          dir: 'south',
          id: 'trainingroom',
        },
        {
          dir: 'west',
          id: 'hallway3',
        },
      ],
    },
    {
      id: 'trainingroom',
      name: 'Training Room',
      desc: `This is a spacious training room filled with various equipment for workouts and skill development. You can hear the faint sound of weights clanging and the scent of sweat in the air.`,
      items: [
        {
          name: 'Dumbbells',
          desc: 'A pair of heavy dumbbells for weight training.', 
          onUse: () => println(`You lift the dumbbells and feel the burn in your muscles.`),
        },
        {
          name: 'Yoga Mat',
          desc: 'A soft mat for stretching and yoga exercises.', 
          onUse: () => println(`You roll out the yoga mat and take a deep breath, ready to find your center.`),
        },
      ],
      exits: [
        {
          dir: 'north',
          id: 'hallway2',
        },
      ],
    },    
    {
      id: 'larslab',
      name: "Lars's Lab",
      desc: `A room full of lab equipment, van parts, and a guitar. To the east is Lars's van parking spot.`,
      items: [
        {
          name: 'Bluglo',
          desc: 'A glowing blue substance used as the main power source for Homebase and Lars\'s van.', 
          onUse: () => println(`It's the main power source of Homebase and Lars's van.`),
        },
        {
          name: 'Guitar',
          desc: 'Lars’s personal guitar. Handle with care—or else.', 
          onUse: () => println(`It's Lars's guitar. He once said if anyone touched it, he would kill them.`),
        },
        {
          name: 'Lab Equipment',
          desc: 'Assorted lab equipment used by Lars and the rest of Steel Wool.', 
          onUse: () => println(`Assorted lab equipment used by Lars and the rest of Steel Wool.`),
        },
        {
          name: 'Llama Leg',
          desc: 'A leg from a dismantled llama.', 
          onUse: () => println(`The leg of a llama.`),
        },
      ],
      exits: [
        {
          dir: 'east',
          id: 'vanparking',
        },
        {
          dir: 'west',
          id: 'hallway2',
        },
      ],
    },    
    {
      id: 'vanparking',
      name: "Van Parking",
      desc: `This is where Lars parks his van. To the west is Lars's lab, and to the south is the power room.`,
      items: [
        {
          name: 'Lars\'s Van',
          desc: 'Lars’s heavily modified van, used for missions and personal projects.', 
          onUse: () => println(`This is Lars's van. If he's not working on music or science, he's working on the van.`),
        },
        {
          name: 'Van Parts',
          desc: 'Spare parts used to repair and upgrade Lars’s van.', 
          onUse: () => println(`Spare parts for Lars's van.`),
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'powerroom',
        },
        {
          dir: 'west',
          id: 'larslab',
        },
      ],
    },   
    {
      id: 'powerroom',
      name: "Power Room",
      desc: `A room with a furnace for fueling the homebase.`,
      exits: [
        {
          dir: 'north',
          id: 'vanparking',
        },
      ],
    }, 
    {
      id: 'hallway3',
      name: 'Hallway',
      desc: `It’s a dimly lit hallway. To the North is **KEVIN'S ROOM**, and to the south is **MAJOR OSWALDS ROOM**.`,
      exits: [
        {
          dir: 'north',
          id: 'kevinsroom',
        },
        {
          dir: 'east',
          id: 'hallwat2',
        },
        {
          dir: 'south',
          id: 'oswaldsroom',
        },
        {
          dir: 'west',
          id: 'hallway4',
        },
      ],
    },
    {
      id: 'kevinsroom',
      name: 'Kevin\'s Room',
      desc: `Kevin's workshop is filled with blueprints, tools, and various upgrade components for enhancing Homebase. The walls are lined with shelves displaying parts from previous projects, and the air is filled with the scent of metal and oil. You can hear the faint sound of machinery humming in the background.`,
      items: [
        {
          name: 'Upgrade Blueprint',
          desc: 'A detailed plan for upgrading various systems in Homebase.', 
          onUse: () => println(`You carefully study the upgrade blueprint, visualizing the improvements it promises.`),
        },
        {
          name: 'Wrench',
          desc: 'A heavy-duty wrench, perfect for tightening bolts and making adjustments.', 
          onUse: () => println(`You grab the wrench, feeling its weight and balance in your hand.`),
        },
      ],
      exits: [
        {
          dir: 'south',
          id: 'hallway3',
        },
        {
          dir: 'west',
          id: 'botsroom',
        },
      ],
    },
    {
      id: 'botsroom',
      name: 'The Bots Room',
      desc: `This cozy space is where Kevin, LoK, and Pop spend their free time. Various tools and spare parts are scattered about, and you can see some unfinished projects in the corner. The room is filled with playful banter and laughter, a welcome break from the chaos outside.`,
      exits: [
        {
          dir: 'east',
          id: 'kevinsroom',
        },
      ],
    }, 
    
  ],
  characters: [
    {
      name: ['Ray', 'Ray', '17'],
      roomId: 'commandcenter',
      desc: 'Ray gives you a thumbs up, exuding confidence.', 
      img: `                                     
                 ++++++++++++               
               +++++++++++++++++            
             ++##########-+++++++           
             +############-++++++           
             +#############++++++           
             +#############+++++++-+        
             #######+--+####+#+++-+++       
             #+#####+++#####+++++-+++       
    ++        ##########++##++#++--++       
    ##+     +##+#############+##++++++      
     ##+    #############-####   ##++++     
     #++   +#++    ######+##+   # ##        
     #++     ++        #    #   # +#+       
 +++#####    ++        #    ##+#   #++      
 ###++#+++   ##                     ##++ ++ 
#####++++++ +##                       #+++++
 ###+++++##+#+#                +##++ #+-++++
 ###### ####+++               +++####++++#+ 
         ######             +++-##+++#+#+   
           ####            ++++#++++## #    
                           ####+#+#         
                            #+  ##          
                                            
      `,
      onTalk: () => println(`Ray says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **HOMEBASE**`,
          line: `Homebase, as you know, is the heart of everything. It's where we manage our heroes, our survivors, and all the tech that keeps us alive out there. It's more than just a headquarters—it’s where we coordinate missions to push back the Storm, build our fortifications, and gather resources. Every upgrade and every decision we make here strengthens our fight against the husks and the Storm. If we lose Homebase, we lose everything.`
        },
        {
          option: `Tell me about **HUSKS**`,
          line: `You’ve faced them—those relentless husks. They're the grunts of the Storm's army, but don’t underestimate them. You've got your standard husks, but then there are the special types—like the Smasher, who can tear through your fort, or the Lobber that throws projectiles from a distance. They come in waves, each more intense than the last. Learning their patterns and weaknesses is key to surviving, especially when things get hectic.`
        },
        {
          option: `Tell me about **STORM**`,
          line: `The Storm. It’s the reason we’re even in this mess. Ever since it appeared, it’s been bringing the husks with it, covering more and more of the world. It’s not just some random weather event—it's a force that wants to take over everything. We push it back with every mission, but it always comes back stronger. Our goal is to keep the Storm at bay and protect what’s left of humanity. But we know it’s always lurking, waiting for us to let our guard down.`
        },
      ],    
    },
    {
      name: ['Clip'],
      roomId: 'armory',
      desc: `Clip stands confidently in the armory, surrounded by an impressive array of weapons and equipment. Her keen eyes scan the room, always alert and ready to assist you with your next mission.`,
      img: `                                                        
                           -+++#+###=                              
                        +++#++*###%#####                           
                       .++++++++**###%%%#+                         
                      *.*+++=+*#%%%%%%%%%%#.                       
                   =####*+-#*####%%%%%%##%#*-                      
                  :++*##*#==++*#%%%%%%%%##%%..                     
                  ==*%%%%#%%*##%%%%%%##%%@%%#+                     
                  +*%@## .  -%%%%%*+++#%%%%%%%=                    
                 .+#%%#      ..:---==+=%%%#%%+                     
                 =#%%%:  .:=#.::#%*++++*%%***                      
                 ##%%# +::==-::-*#+#@%%%+%%##*                     
                  %*%% -+%@%#-.:***=#+*=++@*#*                     
                   %-% .#.#=+  .=-:::--===%+#-                     
                    .- .....   .-=-:--====*#*                      
                     .:.::.....:-=+--==+=--*                       
                      =::......:+--==+===:%+                       
                        .....  =*###*+==+ %*                       
                        *=....:-+**+==-=  -                        
                       *+*#....::::-==+*=-:                        
                      -.=+*#%::..:-=+#*=*#=-                       
                     =++**+*#%#=+##%#*#%##%*                       
                    ==+++#+*##%@####%#%@%+*                        
                   -=-=++#%#%%%#%@*=*++++===-                      
                   .+=++*####%%%%##*=---=-===+++===::.             
                    =**#*#%%%#*%%%#*+-:::::::---=---+::            
                    :#*##%%%%%##%#*+-........:=-:==-.*+-.:.        
                    ::###%%%%%%###+:.........==-=+=.--++:::++      
                 .: :.=##%%%%%%%*=:  . .....+--++----+**:=+*=-     
                +=- :.-#=%%.-%#%:.      ...===-+==-=-::+*#++==.    
               .+=- ::-#=:   ....       ..===++=:--==---*#*++==    
               =+++:.:=#. +    ... . . . -+**++:--=++=--++*+*+=    
               -=+-.:=-%          ..::...=++=+---=++**+=******+:   
              -.+--::-:+         ...   :+=*++-----+*##***#****++   
    `,
      onTalk: () => println(`Clip says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **UPGRADES**`,
          line: `Clip explains, "We have various upgrades available to enhance your gear and weapons. The more you explore, the more you'll find!"`
        },
        {
          option: `Tell me about **WEAPONS**`,
          line: `She gestures to the racks of weapons, "Each weapon has its unique strengths. Choose wisely based on your mission!"`
        },
      ],    
    },    
    {
      name: ['Lars'],
      roomId: 'larslab',
      desc: 'Lars gives you a smile.', 
      img: `                                                    
                       *++**####                             
                     +++**###%%%%%#                          
                   =++***###%%%%%%%%                         
                  +++**##%###%%%%%%%%                        
                  ++**####%%%%%%%%%%%#                       
                 ++*#####%%%%%%%%%%%%%#*                     
                 **#####%%%%%%%%%%%%%%%#                     
                **#####%%%%%%%%%%%%%%%%#                     
                 ####%%+=----+===+*#%=+%*                    
                 #+=-::=+#-=*#%#%##*%*=+##                   
                 #--=*%@#*--*##***++*#=-##                  
                 =-=::==----+**+==++*%+***                   
                 =-%--:--=--=**#*+**##*%*@#                 
                   %==-==---=*%#****##*%%#%%               
                  -**===:--=####+**####@%*%#%                
                  -*#==--%*#%@%%#%**###%@%##*                
                  :++#--#*+**#**##+*##@%%###                 
                  :**@%=-#----=+*%##%%@%%@%#+====            
                  -**%@@-*--==++*#*##%%%#%##*+=====          
                  :%%%# *=++**########%%#%%#*+=-----+       #
                     :-===-==+***#**####%%#%-:::::::-      +*
                 ::-=+**=-----==+*###%%*%*::#%%%#++       =**
                 -=+#%++------*%#%+%%+%%::-%%%%%####*   *+#=*
             -----+%@*+==*#%%=#%+==#@%=:::-###*+====++##*+++*
         ::-----=+#@*%#--------*#-@##::::######***=++*+===++*
        :------==#%#########*####%##:::-%%%#####*#*#%%%@#+===
       :----===+*%#=%#########:%%##:::*%%%%%######%%%%%%%@**=
      ::--====+*#%%=%#*##**#*-%#*+:::#%%%%%###**%%%%%%%#@##%*
     ::-=+++++*#%%%+%*#***#*%%#*-:::%%%%%##***+#%%%%%%%#+==+-
    :---=+**+**#%%%+%####*-%%**::::%%%%%##*+++*%#%%%%%+===-==
    -=# -===+*****#%#%%*%###+=-#-*::::%%*#%#*++++#%%%%%%#+=+=-=
    -%%%%+=++*****%%#**=*#=##+#**:::-%%%*#%+%#++*#%#%%%%++*-=-+++
          `,
      onTalk: () => println(`Lars says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **SYD**`,
          line: `Lars grins and says: "Syd? Oh man, that guy is all about the music. He's one of the best drummers out there. We're lucky to have him in Steel Wool. Always got some creative rhythm going on."`
        },
        {
          option: `Tell me about **ANTHONY**`,
          line: `Lars chuckles and says: "Anthony's always on some wild adventure. That guy is a mad genius with instruments, especially his drumsticks. I just wish he'd stop losing them."`
        },
        {
          option: `Tell me about **CARLOS**`,
          line: `Lars nods and says: "Carlos? Solid dude. He keeps us grounded when the rest of us get too caught up in the music or tech. He's the glue that holds Steel Wool together, honestly."`
        },
      ],    
    },
    {
      name: ['Syd'],
      roomId: 'larslab',
      desc: 'Syd nods in acknowledgment as you approach.', 
      img: `                                                          
                                 #*****                        
                              ==++#####*=                      
                            =++++++*##%+++                     
                            %=%#=%%%+%%%*%%                    
                           =+%*%%+#%%%+%*%#                    
                           =++++#%%%%%+%%@%                    
                          +**%*%#*++++*%%%*                    
                          #+*%%%%%%**%%%%%%#                   
                          *+**%%%%++#%%%@%%                    
                          #******+++*%#####                    
                            ***###++*#%##                      
                           =*##%%%%%%%%%#                      
                           +*%#%####%%%%#                      
                         ####%%%*+**#%%%#                      
                       %%%=%+%%%####%%%%%%#                    
                   **%%%%###+***#%#%%%%%%%%%%#                 
                 %#%##%####%%#%%%*%%%####%%%%%%%%              
              *%%%####%%###*%%%*#%####%###%%%%%%%%%+=          
            *+*####*#*#%%%##%+%%*%%##%%#%%%%%%%%%%%#+#+        
         =*=++*#*******%%%%%%%+%%##++**#%%%#%%%%%%%%%+#+       
       ***+#%=+*###*%%*%%%%%%%%*+%%**++++###%%%%%%%%%*###      
     +*+**+*=++%%%%#***%%%%%%%##++%%%%*%%#**#%%%%%@%%%***#     
    =+*#**+#+++#*%%###*%%%%%%%%%*++#*%#%%%**#%%%+*#%%%#%#%*    
    +++#+**##**#%%%#%%###%%%%%%%#*+**%*#%#**#%%#+##%%%#%##*    
    =+++++#*###+#%*+%%%%*======#%%%****%%*%**#%%%%@+%%%%%%%     
    ++++#####+*+#%%*%%###*=====+%%%#***%%@%#*#%%%@+@%%%%%%#     
    *+++###%%%*#%%%%#%%%#*+=====#%%%##*%%%%%##%%%%%%%%%%%%#     
    ***%%#%#%%##%%%%%%%%%%%+**+*%#%%####%%#%%%%%%%@%%@%%%%%     
    +%%%%%%%%%%%%%@%%%%%++++++++++%%%####%#%%%%%%%#%%@%%%##*    
    **%%%%%%%%%@@%@@%%%%%##*###***+%%%%%%###%%%@@@%%%%%%%%###*   
      `,
      onTalk: () => println(`Syd says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **LARS**`,
          line: `Syd grins and says: "Lars is the man. If it weren't for his mad genius, we'd probably be in a lot of trouble. Plus, the dude rocks on the guitar. Can't compete with that."`
        },
        {
          option: `Tell me about **ANTHONY**`,
          line: `Syd chuckles and says: "Anthony's always up to something. He's got a knack for getting into weird situations, but his drumbeats are what keep us going. Never a dull moment with him."`
        },
        {
          option: `Tell me about **CARLOS**`,
          line: `Syd nods thoughtfully and says: "Carlos? Yeah, he's cool. Real grounded. Keeps us focused when things get hectic, and he's always there when you need him. Wouldn't trade him for anyone."`
        },
      ],    
    },
    {
      name: ['Anthony'],
      roomId: 'larslab',
      desc: 'Anthony nods in acknowledgment as you approach.', 
      img: `                                                        
                          ###%                                 
                        ####%%%%##                             
                      *####%%%%%%%%###*                        
                      ####%%%%%%%%%%%###                       
                     ####%%%%%%%%%%%%%##                       
                     *%#%%#%%%#*****%*%#                       
                      %%#==+++******###**                      
                      %+===+++++*********+                     
                       ======+#%%%%******++                    
                        ==+**%%%#%#%#******#                   
                        ##%%+#%##********#%*                   
                        #+#++*#*************                   
                        ====+*#%********+**                    
                        =++#*%########***++                    
                         +++++#%%######**++ #%%%%%%-*          
                          *#+*#%##**#####***%@@%+#####=        
                           *+++****#%%###**##%%%%####*#*       
                             *#%%%%%%%##%%%%%%%%%%%###**       
                            %@*%%%%%%%%%%%%%%%%%%%#%%####*     
                          %@@@%*###%%%%%%%%%%%%%%%%%%%##+#*    
                         %%%%%%***####%%#%%%%%%%%%%%@@%%#=#    
                         %%%%%@***##%%#%%%%%%%%%%####**=%#     
                        #%%#%@@***%##%%%%%%%%%%#**********=    
                        ##%%%%@*#%###%%%%%@%##******##*###*+=  
                        ###%%%%**###@@@%%###*****************==
                        +#%##%#%#%#%%%####*********************
                      +*=%#%@%#+#%%%###***********##***********
                    ++**+%##%#%##*###***********#*##*#*********
                  +++****@####%*#####*****#******#####***********
                =+++*++*++%+***%##*###**********######***********
               =++******+%%**#*%*####***********####*************
             =+++******++#@**#%#*%##**#******#######*************
      `,
      onTalk: () => println(`Anthony says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **LARS**`,
          line: `Anthony smiles and says: "Lars? He's the mastermind behind the music. Without him, our band wouldn't be half as great. His passion is contagious."`
        },
        {
          option: `Tell me about **SYD**`,
          line: `Anthony chuckles and says: "Syd is one of a kind. He's got a quirky sense of humor, and he keeps things interesting around here."`
        },
        {
          option: `Tell me about **CARLOS**`,
          line: `Anthony nods thoughtfully and says: "Carlos? Solid guy. He's the heart of the team and knows how to keep everyone motivated."`
        },
      ],    
    },
    {
      name: ['Carlos'],
      roomId: 'larslab',
      desc: 'Carlos greets you with a friendly wave.', 
      img: `                                                       
                                  ####.                          
                               ##%#%#%#%#                        
                              +======+++%#                       
                             +++=======+*++                      
                            +#*+===-=+***+-:                     
                            ++**:::-=+++*+-:                     
                           #++++**+:+=*###.:                     
                          #%#+++++*=*+++**                       
                          **##+=+*+=***#%=-%                     
                           -%#*###*##****:##                     
                           #%%%%*#*#%%%##=+                      
                           %##%***+*#%%%%=                       
                           +####+*%*##%%#-                       
                          :#%%#####%#%%#.                        
                        +**###%%%#%%%%+=                         
                      +++**######%%%%**=                         
                   -+++++++****####%%%#+ =                       
                 -+++++***++++++*########+*-+-                   
               ::++=-==++++++++***#####*%#=--==                  
                   -:.    ++++++++*+#####*+:.==-                 
        +:                   :+=++++++**+*+=-----=*=.            
      ....           .          .:=+++****+..- ---:+*+           
     .......         .           .:++++*#+++.+-=-==**+-          
     :::::-.:---...:-:.  .    . :=::+++*+=#*:+-=+.**++=-         
    ::+***++=++**++=+*++=:==:...:-++=+**+#=+*+ +=-%*====+        
    -**************###*****+++++++++##****#+-=*+.=%#*+++**       
    :##**#******###%%%%#####*******#*##***#####*++*+#=--=+++      
    *###########%%%%@@@%%%%%%%%#%#*+%%##**######%#**#*=-----.-    
    +###########%%%%@%@%%%%%%%%#***###%#######%+%%#*#*#+=---+=--   
    #**#####***###%@@%%######*#+*#*++#%#####%##%%%######%===--###: 
    `,
      onTalk: () => println(`Carlos says: "Hey Commander."`),
      topics: [
        {
          option: `Tell me about **LARS**`,
          line: `Carlos smiles and says: "Lars is a genius when it comes to music. He has an incredible vision for our band."`
        },
        {
          option: `Tell me about **SYD**`,
          line: `Carlos chuckles and replies: "Syd has a unique way of looking at things. He keeps us all on our toes!"`
        },
        {
          option: `Tell me about **ANTHONY**`,
          line: `Carlos nods appreciatively and says: "Anthony is the heart of our team. He brings everyone together with his positivity."`
        },
      ],    
    },                       
    {
      name: ['Llama'],
      roomId: 'storageroom1',
      desc: 'The llama gives you a look that tells you to leave.', 
      img: `                                      
                   ....                         
                 ++#---..++##                   
               .#+#---.#++-#                    
              .++#----++#-#.                    
             #++----#++#--.                     
            #+++---+++---.                      
           #++#---#++----                       
           ++++---#++--#                        
           +++-+####-----##..                   
           #+-----------##----#.                
           #------#...#----+#----#.             
          #------+.....#------##+++##           
         ++#-----#..##..-----#++##----.         
         #+++#----.....#----#+#---#--##         
        .--#+++#---###-----++#-----#---.        
        #----#+++#--------++#-----#####.        
       .#------#+++#-----#++-#-########+.       
       .---------#+++#---#+##...#----#+--.      
       ------------#+++#-++#-##.#------#        
        .------------###---#      .+..          
        .#------------------#                   
         .----------+--------#.                 
         #---------------##+.#.                 
         ####...#+...#........+#                
         ....#.....#.#......###                 
         #...##....-.....#......#               
        ..............#.......##.               
        .#++++.....++.#.-++++++++#-             
        +++++++++++++++++++++#+#+#              
       ##++++#+++#+++++#+++++++++#+#            
         #+++#+++++++++#++++#++#+++#.           
           .#####++++++++#++####                                    
      `,
      onTalk: () => println(`............`),
      topics: [
        {
          option: `Tell me about **FRIENDS**`,
          line: `..........`
        },
      ],
    },
  ],
});  
