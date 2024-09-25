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
      desc: `A room to upgrade and customize your weapons. <br> <br> Clip isn't here at the moment.`, 
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
        {
          name: 'Door',
          desc: 'This door leads to the weapon storage room.', 
          onUse: () => println(`It’s locked. Clip must have locked it.`), 
        },
      ],
      exits: [
        {
          dir: 'west', 
          id: 'hallway1',
        },
      ],
    },
    {
      id: 'hallway1',
      name: 'Hallway',
      desc: `It’s a dimly lit hallway. At the south end, there’s a wet floor sign. To the west is a **STORAGE ROOM**, and to the east is the **ARMORY**.`,
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
          dir: 'west',
          id: 'storageroom1',
        },
      ],
    }
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
